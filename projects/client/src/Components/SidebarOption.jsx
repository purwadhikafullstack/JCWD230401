import React from "react";
import "./sidebarOption.css";

function SidebarOption({ active, text, Icon }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <span>
        <Icon className="sidebarOptionIcon" />
      </span>
      <p>{text}</p>
    </div>
  );
}

export default SidebarOption;
