import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import SathyabamaBanner from "../assets/sathyabama_header-logo-A++.jpg";

const loginDetails = [
  {
    usertype: "faculty",
    username: "maryposonia.cse@sathyabama.ac.in",
    password: "CSE-ADMIN",
    name: "Dr.A.Mary Posonia",
    classCoordinator: "IV A3",
    designation: "HOD OF SCAS",
    department: "Computer Science and Engineering",
    contactNumber: "5632147890",
    email: "maryposonia.cse@sathyabama.ac.in",
    officeRoom: "Block A, Room 210",
  },
  {
    usertype: "student",
    username: "balasubramani285@gmail.com",
    password: "Bala*2004",
    name: "Balasubramani E",
    regNo:41110163,
    sec:"A3",
    classCoordinator: "Vijaya Ramalingam",
    branch:"B.E",
    dept:"CSE",
    year:"IV",
    mobileNo:"9874563210",
    email: "balasubramani285@gmail.com",

  },
];

const Demo = () => {
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's already a logged-in user in localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      if (loggedInUser.usertype === "faculty") {
        navigate("/view-student");
      } else if (loggedInUser.usertype === "student") {
        navigate("/view-event");
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = loginDetails.find(
      (element) =>
        element.username === username &&
        element.usertype === userType &&
        element.password === password
    );

    if (user) {
      // Store logged-in user details in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      if (user.usertype === "faculty") {
        navigate("/view-student");
      } else if (user.usertype === "student") {
        navigate("/profile");
      }
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              src={SathyabamaBanner}
              alt="University Logo"
              className="logo"
            />
          </div>
          <h2>OD Portal Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="input-with-icon"
              >
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="input-with-icon"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input-with-icon"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="wave">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              style={{ height: "100%", width: "200%" }}
            >
              <path
                d="M0.00,49.98 C150.00,150.00 350.00,0.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style={{ stroke: "none", fill: "url(#gradient)" }}
              ></path>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#ff7e5f", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#feb47b", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#86a8e7", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
