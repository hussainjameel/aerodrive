import React, { forwardRef, useState, useEffect, useRef } from "react";
import { RefObject, ReactNode } from "react";
import format from "date-fns/format";
import Battery from "./Battery";
import { useInterval } from "~/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const TopBarItem = forwardRef((props, ref) => {
  const hide = props.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const hover = props.forceHover
    ? "bg-gray-100/30 dark:bg-gray-400/40"
    : "hover:(bg-gray-100/30 dark:bg-gray-400/40)";
  return (
    <div
      ref={ref}
      className={`hstack space-x-1 h-6 px-1 cursor-default rounded ${hide} ${hover} ${
        props.className || ""
      }`}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
    >
      {props.children}
    </div>
  );
});
TopBarItem.displayName = "TopBarItem";

const TopBar = (props) => {
  const [state, setState] = useState({
    date: new Date(),
    showControlCenter: false,
    showWifiMenu: false,
    showAppleMenu: false,
  });

  useInterval(() => {
    setState({
      ...state,
      date: new Date(),
    });
  }, 60 * 1000);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    console.log("logout");
  };

  return (
    <div
      className={`w-full h-8 px-2 fixed top-0 hstack justify-between ${
        props.hide ? "z-0" : "z-20"
      } text-sm text-white bg-gray-700/10 backdrop-blur-2xl shadow transition`}
    >
      <div className="hstack space-x-1">
        <TopBarItem className="font-semibold px-2">
          {/* {props.title} */}
          <FontAwesomeIcon icon={faUser} style={{ color: "#47fc00" }} />
          <span>@Username</span>
        </TopBarItem>
      </div>

      <div className="hstack flex-row justify-end space-x-2">
        <TopBarItem>
          <div onClick={() => handleLogout()}>
            <span className="mx-2">Logout</span>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ color: "#0f0b49" }}
            />
          </div>
        </TopBarItem>

        <TopBarItem hideOnMobile={true}>
          <Battery />
        </TopBarItem>

        <TopBarItem>
          <span>{format(state.date, "eee MMM d")}</span>
          <span>{format(state.date, "h:mm aa")}</span>
        </TopBarItem>
      </div>
    </div>
  );
};

export default TopBar;
