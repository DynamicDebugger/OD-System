import React from "react";
import { FaBars } from "react-icons/fa";
import "../../styles/Faculty/HamburgerMenu.css";

const HamburgerMenu = ({ toggleSidebar }) => {
  return (
    <button className="hamburger-menu" onClick={toggleSidebar}>
      <FaBars />
    </button>
  );
};

export default HamburgerMenu;
