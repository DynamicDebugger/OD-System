import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaBell } from "react-icons/fa";
import SathyabamaBanner from "../../assets/logo-new.png";
import "../../styles/LandingBanner.css";
import SideBar from "./SideBar";
import HamburgerMenu from "./HamburgerMenu";

const LandingBanner = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate(); // Define navigate here

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove the logged-in user from localStorage
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="fullscreen-container">
      <header className="header" role="banner">
        <div className="banner-container">
          <HamburgerMenu toggleSidebar={toggleSidebar} />
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <img
            src={SathyabamaBanner}
            alt="University Logo"
            className="banner-logo"
          />
        </div>
        <div className="header-icons">
          <FaBell className="bell-icon" onClick={toggleDropdown} />
          {showDropdown && (
            <div className="dropdown-menu">
              <span
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                Profile
              </span>
              <span className="dropdown-item" onClick={handleLogout}>
                Logout
              </span>
            </div>
          )}
        </div>
      </header>
      <main className="main-content" role="main">
        {children}
      </main>
    </div>
  );
};

export default LandingBanner;
