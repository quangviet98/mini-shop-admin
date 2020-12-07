import { compose, lifecycle, withHandlers, withState } from "recompose";
import { withTableReducer } from "../../enhancers";
import _ from "lodash";
import { accountActions } from "../../../../state/ducks/account";
import { roleActions } from "../../../../state/ducks/role";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const fetchAccounts = (props) => {
  const { dispatchSuccess, dispatchFail, dispatchData, getAccounts } = props;

  dispatchData({});
  getAccounts()
    .then((res) => {
      dispatchSuccess(res.data || [], res.length);
    })
    .catch((err) => {
      // message.error(getString(err, "message"));
      dispatchFail();
    });
};

const updateRoleAccount = async (props, roleId) => {
  const { info, updateRole } = props;
  updateRole(info, { RoleId: roleId });
};

export default compose(
  withRouter,
  withTableReducer,
  withState("visible", "setVisible", false),
  withState("confirmLoading", "setConfirmLoading", false),
  withState("selectedItems", "setSelectedItems", []),
  withState("roles", "setRoles", []),
  withState("info", "setInfo", {}),
  connect(null, {
    getAccounts: accountActions.getAccounts,
    getAccount: accountActions.getAccount,
    getRoles: roleActions.getRoles,
    updateRole: accountActions.updateRole,
    getRolesAccount: accountActions.getRolesAccount,
  }),
  withHandlers({
    handleChangeRole: (props) => (selected) => {
      props.setSelectedItems(selected);
    },
    handleDeselectRole: (props) => (deselected) => {
      updateRoleAccount(props, deselected);
    },
    handleSelectRole: (props) => (selected) => {
      updateRoleAccount(props, selected);
    },
    handleOpenModal: (props) => (id) => {
      const { setVisible, getRolesAccount, setSelectedItems, setInfo } = props;
      setVisible(true);
      getRolesAccount(id)
        .then((res) => {
          setInfo(id);
          setSelectedItems((res.data || []).map((f) => f.RoleId));
        })
        .catch((err) => console.log("err", err));
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getRoles, setRoles } = this.props;
      console.log("props", this.props);
      fetchAccounts(this.props);
      getRoles()
        .then((res) => {
          setRoles(res.data || []);
        })
        .catch((err) => console.log("err", err));
    },
  })
);
