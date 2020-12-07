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
  connect((state) => ({ user: state["authUser"].user }), {
    getOrders: orderActions.getOrders,
    updateProcess: orderActions.updateProcess,
    getDeliver: orderActions.getDeliver,
  }),
  withHandlers({
    handleConfirm: (props) => (id) => {
      let fData = { Id: id, Status: "S" };

      Modal.confirm({
        content: "Xác nhận đơn hàng đã giao đến khách?",
        onOk() {
          update(props, id, fData);
        },
        onCancel() {},
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getDeliver, setDeliver } = this.props;
      fetchOrders(this.props);
    },
  })
);
