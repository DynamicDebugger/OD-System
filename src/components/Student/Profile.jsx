import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../../styles/Student/Profile.css";
import LandingBanner from "./LandingBanner";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user details from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <LandingBanner>
      <div className="profile-main">
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-details">
              <FaUserCircle size={100} className="profile-icon" />
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p>
                  {user.regNo}, {user.sec}
                </p>
              </div>
            </div>
            <div className="profile-fields">
              {[
                { label: "Class Coordinator", value: user.classCoordinator },
                { label: "Branch", value: user.branch },
                { label: "Department", value: user.dept },
                { label: "Year", value: user.year },
                { label: "Mobile Number", value: user.mobileNo },
                { label: "Email ID", value: user.email },
              ].map((field, index) => (
                <div key={index} className="profile-field">
                  <span className="field-label">{field.label}:</span>
                  <span className="field-value">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LandingBanner>
  );
};

export default ProfilePage;

