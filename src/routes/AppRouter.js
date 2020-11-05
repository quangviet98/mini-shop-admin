import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import * as PATH from "../configs/routesConfig";
import LoginForm from "../views/container/AuthForm/LoginForm";
import OrderList from "../views/container/Orders";
import AuthRoute from "./AuthRoute";
import { ROLES } from "../configs/menus";

// const roles = ["Administrator", "Staff", "DELIVER"];

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={PATH.LOGIN_PATH} component={() => <LoginForm />} />
        <AuthRoute
          exact={false}
          path={PATH.ORDER_PATH}
          component={() => <OrderList />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={false}
          path={PATH.PRODUCT_PATH}
          component={() => <OrderList />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={false}
          path={PATH.CATEGORY_PATH}
          component={() => <OrderList />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={false}
          path={PATH.ACCOUNT_PATH}
          component={() => <OrderList />}
          roles={[ROLES.admin]}
        />
        <AuthRoute
          exact={false}
          path={PATH.ROLE_PATH}
          component={() => <OrderList />}
          roles={[ROLES.admin]}
        />
        <AuthRoute
          exact={false}
          path={PATH.DELIVER_PATH}
          component={() => <OrderList />}
          roles={[ROLES.deliver]}
        />
        <Redirect to={PATH.DEFAULT_PATH} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
