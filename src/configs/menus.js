import * as PATH from "./routesConfig";
import { Icon } from "antd";

export const menus = {
  ORDER: {
    icon: <Icon type="shopping" />,
    name: "Đơn hàng",
    path: PATH.ORDER_PATH,
  },
  PRODUCT: {
    icon: <Icon type="skin" />,
    name: "Sản phẩm",
    path: PATH.PRODUCT_PATH,
  },
  CATEGORIES: {
    icon: <Icon type="profile" />,
    name: "Danh mục",
    path: PATH.CATEGORY_PATH,
  },
  ACCOUNT: {
    icon: <Icon type="usergroup-delete" />,
    name: "Tài khoản",
    path: PATH.ACCOUNT_PATH,
  },
  ROLES: {
    icon: <Icon type="unlock" />,
    name: "Roles",
    path: PATH.ROLE_PATH,
  },
};

// roles = ["Administrator", "Staff", "DELIVER"];
export const ROLES = {
  admin: "Administrator",
  staff: "Staff",
  deliver: "DELIVER",
};

export const getMenus = (roles) => {
  let menus = {};
  (roles || []).map((role) => {
    if (role.name === ROLES.admin) {
      menus = {
        ...menus,
        ORDER: {
          icon: <Icon type="shopping" />,
          name: "Đơn hàng",
          path: PATH.ORDER_PATH,
        },
        PRODUCT: {
          icon: <Icon type="skin" />,
          name: "Sản phẩm",
          path: PATH.PRODUCT_PATH,
        },
        CATEGORIES: {
          icon: <Icon type="profile" />,
          name: "Danh mục",
          path: PATH.CATEGORY_PATH,
        },
        ACCOUNT: {
          icon: <Icon type="usergroup-delete" />,
          name: "Tài khoản",
          path: PATH.ACCOUNT_PATH,
        },
        ROLES: {
          icon: <Icon type="unlock" />,
          name: "Roles",
          path: PATH.ROLE_PATH,
        },
      };
    } else if (role.name === ROLES.staff) {
      menus = {
        ...menus,
        ORDER: {
          icon: <Icon type="shopping" />,
          name: "Đơn hàng",
          path: PATH.ORDER_PATH,
        },
        PRODUCT: {
          icon: <Icon type="skin" />,
          name: "Sản phẩm",
          path: PATH.PRODUCT_PATH,
        },
        CATEGORIES: {
          icon: <Icon type="profile" />,
          name: "Danh mục",
          path: PATH.CATEGORY_PATH,
        },
      };
    } else if (role.name === ROLES.deliver) {
      menus = {
        ...menus,
        DELIVERY: {
          icon: <Icon type="car" />,
          name: "Đơn giao hàng",
          path: PATH.DELIVER_PATH,
        },
      };
    }
  });
  return menus;
};
