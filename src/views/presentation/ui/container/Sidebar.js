import React, { useEffect, useRef, useState } from "react";
import { Menu, Icon, Button } from "antd";
import logo from "../../../../static/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { map } from "lodash";

function renderMenuItem(props) {
  const { key, icon, name, path, subMenus } = props;
  if (subMenus) {
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon} <span>{name}</span>
          </span>
        }
      >
        {map(subMenus, (item, key) => renderMenuItem({ ...item, key }))}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item key={key}>
      <Link to={path} className="d-flex flex-row align-items-center ">
        {icon} <span>{name}</span>
      </Link>
    </Menu.Item>
  );
}

function Sidebar({ menus, isCollapsed }) {
  const [defaultActive, setDefaultActive] = useState(undefined);

  const location = useLocation();
  useEffect(() => {
    Object.keys(menus).map((key) => {
      if (menus[key].path === location.pathname) {
        setDefaultActive(key);
      }
    });
  }, []);

  const handleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setDefaultActive(key);
  };
  return (
    <div className="sidebar">
      <Link className="navbar-brand mb-4" to="/">
        <img
          className="brand-logo-bb"
          src={logo}
          alt="BBPay logo"
          height="60px"
        />
      </Link>
      <Menu
        selectedKeys={defaultActive}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapsed}
        onSelect={handleSelect}
      >
        {map(menus, (item, key) => renderMenuItem({ ...item, key }))}
      </Menu>
    </div>
  );
}

export default Sidebar;
