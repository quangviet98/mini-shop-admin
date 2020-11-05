import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN_PATH } from "../configs/routesConfig";
import AppContentWrapper from "../views/presentation/ui/container/AppContentWrapper";
import { getMenus } from "../configs/menus";

const AuthRoute = ({ component: Component, roles, user, ...rest }) => {
  let accept = false;
  let menus = {};

  if (user) {
    menus = getMenus(user.roles);

    (user.roles || []).forEach((role) => {
      if (roles.includes(role.name)) accept = true;
    });
  }

  return (
    <AppContentWrapper menus={menus}>
      <Route
        {...rest}
        render={(props) => {
          return accept ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: LOGIN_PATH,
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    </AppContentWrapper>
  );
};

export default connect((state) => ({ user: state["authUser"].user }))(
  AuthRoute
);
