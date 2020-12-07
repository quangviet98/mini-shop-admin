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
  withState("currentStep", "setCurrentStep", null),
  connect((state) => ({ user: state["authUser"].user }), {
    getOrders: orderActions.getOrders,
    updateProcess: orderActions.updateProcess,
    getDeliver: orderActions.getDeliver,
    getOrderDetail: orderActions.getOrderDetail,
    getOrder: orderActions.getOrder,
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
      const {
        getDeliver,
        setDeliver,
        getOrderDetail,
        getOrders,
        match,
        user,
        dispatchSuccess,
        setCurrentStep,
      } = this.props;

      if (match.params.id) {
        Promise.all([getOrders(user.id), getOrderDetail(match.params.id)])
          .then((res) => {
            const orders = res[0].data;
            const items = res[1].data;
            const order = (orders || []).filter(
              (o) => o.Id === match.params.id
            );
            const total = (res[1].data || []).reduce(
              (acc, crt) => acc + crt.Price * crt.Quantity,
              0
            );

            switch (order[0] && order[0].Status_code) {
              case "P":
                setCurrentStep(0);
                break;
              case "X":
                setCurrentStep(null);
                break;
              case "C":
                setCurrentStep(1);
                break;
              case "S":
                setCurrentStep(2);
                break;
            }

            const data = { order: order[0], items, total };
            dispatchSuccess(data);
          })
          .catch((err) => {});
      }
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
