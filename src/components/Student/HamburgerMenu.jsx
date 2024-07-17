import React from "react";
import { FaBars } from "react-icons/fa";
// import "../../styles/Faculty/HamburgerMenu.css";

const HamburgerMenu = ({ toggleSidebar }) => {
  return (
    <button
      className="hamburger-menu"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <FaBars />
    </button>
  );
};

export default HamburgerMenu;
