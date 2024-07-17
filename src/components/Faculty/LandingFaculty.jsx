import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import "../../styles/Faculty/LandingFaculty.css"; // Ensure the correct path to the CSS file
import LandingBanner from "./LandingBanner";

const LandingFaculty = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  if (!loggedInUser) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <LandingBanner>
      <div className="profile-main">
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-details">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-info">
                <h2>{loggedInUser.name}</h2>
                <p>Faculty, {loggedInUser.department} Department</p>
              </div>
            </div>
            <div className="profile-fields">
              {[
                {
                  label: "Class Co-ordinator",
                  value: loggedInUser.classCoordinator,
                },
                { label: "Designation", value: loggedInUser.designation },
                { label: "Department", value: loggedInUser.department },
                { label: "Contact Number", value: loggedInUser.contactNumber },
                { label: "Email ID", value: loggedInUser.email },
                { label: "Office Room", value: loggedInUser.officeRoom },
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

export default LandingFaculty;
