import { compose, lifecycle, withHandlers, withState } from "recompose";
import _ from "lodash";
import { productActions } from "../../../../state/ducks/product";
import { categoryActions } from "../../../../state/ducks/category";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withFormik } from "formik";
import { message } from "antd";
import * as PATH from "../../../../configs/routesConfig";
import * as yup from "yup";
import {
  imageValidate,
  requiredValidField,
} from "../../../utilities/validation/input";

const validationSchema = yup.object().shape({
  CategoryId: requiredValidField,
  Name: requiredValidField,
  Price: requiredValidField,
  ImageUrl: imageValidate,
  Quantity: requiredValidField,
});

export default compose(
  withRouter,
  connect(null, {
    getProducts: productActions.getProducts,
    getProductById: productActions.getProductById,
    createProduct: productActions.createProduct,
    updateProduct: productActions.updateProduct,
    getCategories: categoryActions.getCategories,
  }),
  withState("upLoading", "setUpLoading", false),
  withState("imageUrl", "setImageUrl", undefined),
  withState("categories", "setCategories", []),
  withState("isEdit", "setIsEdit", false),
  withFormik({
    mapPropsToValues: (props) => {
      return {
        CategoryId: undefined,
        Name: undefined,
        Description: undefined,
        Price: undefined,
        ImageUrl: undefined,
        Quantity: undefined,
        Discount: undefined,
      };
    },
    validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      const { createProduct, history, isEdit, updateProduct, match } = props;
      setSubmitting(true);
      if (!isEdit) {
        createProduct(values)
          .then((res) => {
            setSubmitting(false);
            message.success("Thêm sản phẩm thành công");
            history.push(PATH.PRODUCT_PATH);
          })
          .catch((err) => {
            message.error("Thêm sản phẩm thất bại");
            setSubmitting(false);
            history.push(PATH.PRODUCT_PATH);
          });
      } else {
        updateProduct(match.params.id, values)
          .then((res) => {
            setSubmitting(false);
            message.success("Cập nhật sản phẩm thành công");
            history.push(PATH.PRODUCT_PATH);
          })
          .catch((err) => {
            message.error("Cập nhật sản phẩm thất bại");
            setSubmitting(false);
          });
      }
    },
  }),
  withHandlers({
    handleUploadImage: (props) => (info) => {
      const { setUpLoading, setImageUrl, setFieldValue } = props;
      if (info.file.status === "uploading") {
        setUpLoading(true);
        return;
      }
      if (info.file.status === "done") {
        // http://45.76.152.153:8180/services/vslfiles/api/images/
        const url = info.fileList[0].response.data.path.filename;

        setUpLoading(false);
        setImageUrl(url);
        setFieldValue("ImageUrl", url);
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        getCategories,
        setCategories,
        match,
        setIsEdit,
        getProductById,
        setValues,
      } = this.props;
      if (match.params.id) {
        setIsEdit(true);
        getProductById(match.params.id)
          .then((res) => {
            const {
              CategoryId,
              Name,
              Description,
              Price,
              ImageUrl,
              Quantity,
              Discount,
            } = res.data[0];

            setValues({
              CategoryId,
              Name,
              Description,
              Price,
              ImageUrl,
              Quantity,
              Discount,
            });
          })
          .catch((err) => {});
      }

      getCategories()
        .then((res) => {
          setCategories(
            (res.data || []).map((cate) => ({
              value: cate.Id,
              label: cate.Name,
            }))
          );
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  })
);
