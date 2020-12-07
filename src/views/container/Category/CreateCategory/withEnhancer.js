import { compose, lifecycle, withHandlers, withState } from "recompose";
import _ from "lodash";
import { productActions } from "../../../../state/ducks/product";
import { categoryActions } from "../../../../state/ducks/category";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withFormik } from "formik";
import { message } from "antd";
import * as PATH from "../../../../configs/routesConfig";
import { requiredValidField } from "../../../utilities/validation/input";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  Name: requiredValidField,
  Description: requiredValidField,
});

export default compose(
  withRouter,
  connect(null, {
    createCategory: categoryActions.createCategory,
    getCategoryById: categoryActions.getCategoryById,
    updateCategory: categoryActions.updateCategory,
  }),
  withState("isEdit", "setIsEdit", false),
  withFormik({
    validationSchema,
    mapPropsToValues: (props) => {
      return {
        Name: undefined,
        Description: undefined,
      };
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      const { createCategory, history, isEdit, updateCategory, match } = props;
      setSubmitting(true);
      if (!isEdit) {
        createCategory(values)
          .then((res) => {
            setSubmitting(false);
            message.success("Thêm danh mục thành công");
            history.push(PATH.CATEGORY_PATH);
          })
          .catch((err) => {
            message.error("Thêm danh mục thất bại");
            setSubmitting(false);
          });
      } else {
        updateCategory(match.params.id, values)
          .then((res) => {
            setSubmitting(false);
            message.success("Cập nhật danh mục thành công");
            history.push(PATH.CATEGORY_PATH);
          })
          .catch((err) => {
            message.error("Cập nhật danh mục thất bại");
            setSubmitting(false);
          });
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { match, setIsEdit, getCategoryById, setValues } = this.props;
      if (match.params.id) {
        setIsEdit(true);
        getCategoryById(match.params.id)
          .then((res) => {
            const { Name, Description } = res.data[0];

            setValues({
              Name,
              Description,
            });
          })
          .catch((err) => {});
      }
    },
  })
);
