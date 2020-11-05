import React from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { authActions } from "../../../../state/ducks/authUser";

function Navigation({ isCollapsed, changeCollapse, user, logout }) {
  return (
    <nav className="nav-bar d-flex flex-row align-items-center">
      <div className="nav-bar__left"></div>
      <div className="nav-bar__right d-flex flex-row align-items-center justify-content-between">
        <button
          className="nav-bar__right__icon-collapse"
          onClick={changeCollapse}
        >
          {isCollapsed ? (
            <Icon type="menu-fold" />
          ) : (
            <Icon type="menu-unfold" />
          )}
        </button>

        <div className="nav-bar__right__end">
          <span>{user && user.ten} </span>
          <span className="middle"> | </span>
          <span>
            <button className="nav-bar__right__btn-logout" onClick={logout}>
              Logout
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default connect((state) => ({ user: state["authUser"].user }), {
  logout: authActions.logout,
})(Navigation);
