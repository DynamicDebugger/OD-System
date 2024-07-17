import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaBell } from "react-icons/fa";
import SathyabamaBanner from "../../assets/logo-new.png"; // Ensure the correct path to the logo image
import "../../styles/LandingBanner.css"; // Assuming you have a separate CSS file for styles
import SideBar from "./SideBar";
import HamburgerMenu from "./HamburgerMenu";

const LandingBanner = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for navigation

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove the logged-in user from localStorage
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="fullscreen-container">
      <header className="header">
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
              <span className="dropdown-item"  onClick={() => navigate("/faculty")}>Profile</span>
              <span className="dropdown-item" onClick={handleLogout}>
                Logout
              </span>{" "}
              {/* Call handleLogout on click */}
            </div>
          )}
        </div>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default LandingBanner;
