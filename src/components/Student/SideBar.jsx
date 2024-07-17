import React from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaCalendarAlt,
  FaClipboardList,
  FaList,
  FaCheckCircle,
  FaQrcode,
} from "react-icons/fa";
import "../../styles/Faculty/SideBar.css";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} role="navigation">
      <button
        className="close-btn"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        <FaTimes />
      </button>
      <nav className="sidebar-nav">
        <Link to="/view-event" onClick={toggleSidebar}>
          <FaCalendarAlt /> View Event
        </Link>
        <Link to="/upcoming-event" onClick={toggleSidebar}>
          <FaClipboardList /> Upcoming Events
        </Link>
        <Link to="/events-participated" onClick={toggleSidebar}>
          <FaList /> Events participated
        </Link>
        <Link to="/approval" onClick={toggleSidebar}>
          <FaCheckCircle /> Approval
        </Link>
        <Link to="/attendance" onClick={toggleSidebar}>
          <FaQrcode /> Attendance
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
