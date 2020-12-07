import { compose, lifecycle, withHandlers, withState } from "recompose";
import { withTableReducer } from "../../enhancers";
import _ from "lodash";
import { orderActions } from "../../../../state/ducks/order";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";

const generatePagination = (
  pageInfo = {
    page: 0,
    size: 10,
  }
) => {
  return {
    page: _.isNumber(pageInfo.page) ? pageInfo.page : 0,
    size: _.isNumber(pageInfo.size) ? pageInfo.size : 10,
  };
};

const fetchOrders = (props, pagination = generatePagination()) => {
  const {
    dispatchSuccess,
    dispatchFail,
    dispatchData,
    getOrders,
    user,
  } = props;
  let query = {
    ...pagination,
  };
  dispatchData(query);
  getOrders(user.id)
    .then((res) => {
      dispatchSuccess(res.data, res.total);
    })
    .catch((err) => {
      // message.error(getString(err, "message"));

      dispatchFail();
    });
};

const update = (props, id, data) => {
  const { updateProcess, setVisible } = props;

  updateProcess(id, data)
    .then((res) => {
      console.log("res", res);
      fetchOrders(props);
      setVisible(false);
    })
    .catch((err) => console.log("err", err));
};

export default compose(
  withRouter,
  withTableReducer,
  withState("idOrder", "setIdOrder", undefined),
  withState("visible", "setVisible", false),
  withState("confirmLoading", "setConfirmLoading", false),
  withState("selectedDeliver", "setSelectedDeliver", undefined),
  withState("deliver", "setDeliver", []),
  connect((state) => ({ user: state["authUser"].user }), {
    getOrders: orderActions.getOrders,
    updateProcess: orderActions.updateProcess,
    getDeliver: orderActions.getDeliver,
  }),
  withHandlers({
    handleCancelOrder: (props) => (id) => {
      let fData = { Id: id, Status: "X" };

      Modal.confirm({
        content: "Bạn có chắc muốn hủy đơn hàng này?",
        onOk() {
          update(props, id, fData);
        },
        onCancel() {},
      });
    },
    handleChangeDeliver: (props) => (value) => {
      console.log("val", value);
      props.setSelectedDeliver(value);
    },
    handleDeliveryOrder: (props) => () => {
      const { selectedDeliver, idOrder, user } = props;

      let data = {
        Id: idOrder,
        Status: "C",
        DeliverId: selectedDeliver,
        AccountId: user.id,
      };
      update(props, idOrder, data);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getDeliver, setDeliver } = this.props;
      fetchOrders(this.props);
      getDeliver()
        .then((res) => {
          setDeliver(
            (res || []).map((dv) => ({ label: dv.tT_Delivers, value: dv.id }))
          );
        })
        .catch((err) => console.log("err", err));
    },
  })
);
