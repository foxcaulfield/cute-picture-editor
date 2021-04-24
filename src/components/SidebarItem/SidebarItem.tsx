import React from "react";

type SidebarItemType = {
  name: string;
  active: boolean;
  handleClick: any; //!!!!!!!!!!!!!!!!!!!!!!!!1
};

function SidebarItem(props: SidebarItemType) {
  return (
    <button
      className={`sidebarItem ${props.active ? "active" : ""}`}
      onClick={props.handleClick}
    >
      {props.name}
    </button>
  );
}

export default SidebarItem;
