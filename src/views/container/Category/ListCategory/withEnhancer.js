import { compose, lifecycle, withHandlers } from "recompose";
import { withTableReducer } from "../../enhancers";
import _ from "lodash";
import { categoryActions } from "../../../../state/ducks/category";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteProduct } from "../../../../state/ducks/product/actions";
import { message } from "antd";

const fetchCategory = (props) => {
  const { dispatchSuccess, dispatchFail, dispatchData, getCategories } = props;

  dispatchData({});
  getCategories({})
    .then((res) => {
      dispatchSuccess(res.data, res.length);
    })
    .catch((err) => {
      // message.error(getString(err, "message"));

      dispatchFail();
    });
};

export default compose(
  withRouter,
  withTableReducer,
  connect(null, {
    getCategories: categoryActions.getCategories,
    deleteCategory: categoryActions.deleteCategory,
  }),
  withHandlers({
    handleDeleteCategory: (props) => (id) => {
      const { deleteCategory } = props;
      deleteCategory(id)
        .then((res) => {
          message.success("Xóa danh mục thành công");
          fetchCategory(props);
        })
        .catch((err) => {
          message.error("Xóa danh mục thất bại");
        });
    },
  }),
  lifecycle({
    componentDidMount() {
      fetchCategory(this.props);
    },
  })
);
