import React, { useState } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

function AppContentWrapper({ menus, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`container-page ${collapsed && "collapsed"}`}>
      <Navigation
        isCollapsed={collapsed}
        changeCollapse={() => setCollapsed(!collapsed)}
      />
      <div className="page-body-wrapper">
        <Sidebar menus={menus} isCollapsed={collapsed} />
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
}

export default AppContentWrapper;
