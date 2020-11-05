import { compose } from "recompose";
import { connect } from "react-redux";
import * as yup from "yup";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { authActions } from "../../../../state/ducks/authUser";
import { stringRequired } from "../../../../views/utilities/validation/input";
import * as PATH from "../../../../configs/routesConfig";
import { showErrorMessage } from "../../../../configs/serverErrors";
import { ROLES } from "../../../../configs/menus";

const validationSchema = yup.object().shape({
  usr: stringRequired,
  pwd: stringRequired,
});

export default compose(
  withRouter,
  connect(null, {
    login: authActions.login,
  }),
  withFormik({
    displayName: "loginForm",
    mapPropsToValues: (props) => {
      return { usr: undefined, pwd: undefined };
    },
    validationSchema,
    handleSubmit: async (values, { props, setSubmitting }) => {
      const { login, history, match } = props;
      login(values.usr, values.pwd)
        .then((res) => {
          setSubmitting(false);

          console.log("res", res);
          if (res.roles[0] && res.roles[0].name === ROLES.deliver) {
            history.push(PATH.DELIVER_PATH);
          } else {
            history.push(PATH.ORDER_PATH);
          }
        })
        .catch((err) => {
          setSubmitting(false);
          showErrorMessage(err);
          console.log("err", err);
        });
    },
  })
);
