import React from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaUserGraduate,
  FaUserPlus,
  FaUserEdit,
  FaChalkboardTeacher,
  FaCheck,
  FaCalendarAlt,
  FaCalendarPlus,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";
import "../../styles/Faculty/SideBar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <nav className="sidebar-nav">
        <Link to="/view-student" onClick={toggleSidebar}>
          <FaUserGraduate /> View Student
        </Link>
        <h2>Class</h2>
        <Link to="/class/mentored" onClick={toggleSidebar}>
          <FaChalkboardTeacher /> Student Mentored
        </Link>
        <Link to="/class/approval" onClick={toggleSidebar}>
          <FaCheck /> Approval
        </Link>
        <h2>Event</h2>
        <Link to="/event/view-event" onClick={toggleSidebar}>
          <FaCalendarAlt /> View Event
        </Link>
        <Link to="/event/add-event" onClick={toggleSidebar}>
          <FaCalendarPlus /> Add Event
        </Link>
        <Link to="/event/events" onClick={toggleSidebar}>
          <FaCalendarCheck /> Ongoing Event
        </Link>
        <Link to="/event/attendance" onClick={toggleSidebar}>
          <FaClipboardList /> Attendance
        </Link>
        <h2>Mentor</h2>
        <Link to="/mentor/add-student" onClick={toggleSidebar}>
          <FaUserPlus /> Add Student
        </Link>
        <Link to="/mentor/view-student" onClick={toggleSidebar}>
          <FaUserGraduate /> View Student
        </Link>
        <Link to="/mentor/update-student" onClick={toggleSidebar}>
          <FaUserEdit /> Update Student
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
