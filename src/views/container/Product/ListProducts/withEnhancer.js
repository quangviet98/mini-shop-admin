import { compose, lifecycle, withHandlers, withState } from "recompose";
import { withTableReducer } from "../../enhancers";
import _ from "lodash";
import { productActions } from "../../../../state/ducks/product";
import { categoryActions } from "../../../../state/ducks/category";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { message } from "antd";

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

const fetchProducts = (props, pagination = generatePagination()) => {
  const { dispatchSuccess, dispatchFail, dispatchData, getProducts } = props;
  let query = {
    ...pagination,
  };
  dispatchData(query);
  getProducts(query)
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
    getProducts: productActions.getProducts,
    deleteProduct: productActions.deleteProduct,
    getCategories: categoryActions.getCategories,
  }),
  withState("categorires", "setCategories", {}),
  withHandlers({
    handleDeleteProduct: (props) => (id) => {
      const { deleteProduct } = props;
      deleteProduct(id)
        .then((res) => {
          message.success("Xóa sản phẩm thành công");
          fetchProducts(props);
        })
        .catch((err) => {
          message.error("Xóa sản phẩm thất bại");
        });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getCategories, setCategories } = this.props;
      getCategories()
        .then((res) => {
          let cates = {};
          (res.data || []).map((cate) => {
            cates[cate.Id] = cate.Name;
          });
          setCategories(cates);
        })
        .catch(() => {});
      fetchProducts(this.props);
    },
  })
);
