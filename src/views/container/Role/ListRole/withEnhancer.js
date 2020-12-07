import { compose, lifecycle } from "recompose";
import { withTableReducer } from "../../enhancers";
import _ from "lodash";
import { roleActions } from "../../../../state/ducks/role";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const fetchRoles = (props) => {
  const { dispatchSuccess, dispatchFail, dispatchData, getRoles } = props;

  dispatchData();
  getRoles()
    .then((res) => {
      dispatchSuccess(res.data || [], res.length);
    })
    .catch((err) => {
      // message.error(getString(err, "message"));

      dispatchFail();
    });
};

export default compose(
  withRouter,
  withTableReducer,
  connect(null, { getRoles: roleActions.getRoles }),
  lifecycle({
    componentDidMount() {
      fetchRoles(this.props);
    },
  })
);
