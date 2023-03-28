import React from "react";
import "./sidebar.css";
import SidebarOption from "./SidebarOption";
import { BsHouseFill } from "react-icons/bs";
import { BiNotification } from "react-icons/bi";
import { BiMessageAltDots } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

// tergantung rolenya dipisahin tenant sama user

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarOption Icon={CgProfile} text="Profile" />
      <SidebarOption Icon={BsHouseFill} text="Manage Properties/Rooms" />
      <SidebarOption Icon={BiNotification} text="Transactions" />
      <SidebarOption Icon={BiMessageAltDots} text="Report" />
    </div>
  );
}

export default Sidebar;
