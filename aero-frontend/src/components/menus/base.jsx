import { ReactNode } from "react";

const MenuItem = (props) => {
  return (
    <li
      onClick={props.onClick}
      className="leading-6 cursor-default px-2.5 rounded hover:text-white hover:bg-blue-500"
    >
      {props.children}
    </li>
  );
};

const MenuItemGroup = (props) => {
  const border =
    props.border === false
      ? "pb-1"
      : "after:(content-empty block pb-0 h-1.5 max-w-full mx-2 border-b c-border-400)";
  return <ul className={`relative px-1 pt-1 ${border}`}>{props.children}</ul>;
};

export { MenuItem, MenuItemGroup };
