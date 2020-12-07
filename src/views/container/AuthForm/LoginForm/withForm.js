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
    getInfo: authActions.getInfo,
  }),
  withFormik({
    displayName: "loginForm",
    mapPropsToValues: (props) => {
      return { usr: undefined, pwd: undefined };
    },
    validationSchema,
    handleSubmit: async (values, { props, setSubmitting }) => {
      const { login, history, match, getInfo } = props;
      login(values.usr, values.pwd)
        .then((res) => {
          setSubmitting(false);
          getInfo(res.id)
            .then((res) => {
              const roles = (res.roles || []).filter(
                (role) => role.checked === true
              );

              let defaultPath = "/login";
              roles.map((r) => {
                if (r.name === ROLES.deliver) {
                  defaultPath = PATH.DELIVER_PATH;
                } else if (r.name === ROLES.admin || r.name === ROLES.staff) {
                  defaultPath = PATH.ORDER_PATH;
                }
              });
              history.push(defaultPath);
            })
            .catch((err) => console.log("err", err));
        })
        .catch((err) => {
          setSubmitting(false);
          showErrorMessage(err);
          console.log("err", err);
        });
    },
  })
);
