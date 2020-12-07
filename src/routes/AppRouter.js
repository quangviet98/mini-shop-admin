import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import * as PATH from "../configs/routesConfig";
import AuthRoute from "./AuthRoute";
import { ROLES } from "../configs/menus";
import LoginForm from "../views/container/AuthForm/LoginForm";
import ListOrder from "../views/container/Orders/ListOrders";
import ListProduct from "../views/container/Product/ListProducts";
import ListCategory from "../views/container/Category/ListCategory";
import ListAccount from "../views/container/Account/ListAccount";
import ListDelivery from "../views/container/Delivery/ListDelivery";
import ListRole from "../views/container/Role/ListRole";
import CreateAccount from "../views/container/Account/CreateAccount";
import CreateProduct from "../views/container/Product/CreateProduct";
import CreateCategory from "../views/container/Category/CreateCategory";
import OrderDetail from "../views/container/Orders/OrderDetail";
// const roles = ["Administrator", "Staff", "DELIVER"];

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={PATH.LOGIN_PATH} component={() => <LoginForm />} />
        <AuthRoute
          exact={true}
          path={PATH.ORDER_PATH}
          component={() => <ListOrder />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={true}
          path={PATH.ORDER_DETAIL_PATH}
          component={() => <OrderDetail />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={true}
          path={PATH.PRODUCT_PATH}
          component={() => <ListProduct />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={true}
          path={PATH.CREATE_PRODUCT_PATH}
          component={() => <CreateProduct />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={true}
          path={PATH.UPDATE_PRODUCT_PATH}
          component={() => <CreateProduct />}
          roles={[ROLES.admin, ROLES.staff]}
        />

        <AuthRoute
          exact={true}
          path={PATH.CATEGORY_PATH}
          component={() => <ListCategory />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={true}
          path={PATH.CREATE_CATEGORY_PATH}
          component={() => <CreateCategory />}
          roles={[ROLES.admin, ROLES.staff]}
        />
        <AuthRoute
          exact={true}
          path={PATH.UPDATE_CATEGORY_PATH}
          component={() => <CreateCategory />}
          roles={[ROLES.admin, ROLES.staff]}
        />

        <AuthRoute
          exact={true}
          path={PATH.ACCOUNT_PATH}
          component={() => <ListAccount />}
          roles={[ROLES.admin]}
        />
        <AuthRoute
          exact={true}
          path={PATH.CREATE_ACCOUNT_PATH}
          component={() => <CreateAccount />}
          roles={[ROLES.admin]}
        />
        <AuthRoute
          exact={true}
          path={PATH.ROLE_PATH}
          component={() => <ListRole />}
          roles={[ROLES.admin]}
        />
        <AuthRoute
          exact={true}
          path={PATH.DELIVER_PATH}
          component={() => <ListDelivery />}
          roles={[ROLES.deliver]}
        />
        <Redirect to={PATH.DEFAULT_PATH} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
