import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingBanner from "../LandingBanner"; // Ensure you have the correct path
import styles from "../../../styles/Faculty/Mentor/AddStudent.module.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    registerNumber: "",
    name: "",
    purpose: "",
    startDate: "",
    endDate: "",
    department: "",
    year: "", // Changed to string type for dropdown value
    section: "",
    email: "",
    contactNumber: "",
    status: "ongoing", // Default status
  });

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
      setLoading(false); // Set loading to false once user is fetched
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ ...formData, addedBy: loggedInUser.name });
    localStorage.setItem("students", JSON.stringify(students));
    navigate("/mentor/view-student");
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle no user case
  if (!loggedInUser) {
    return <div>No user found.</div>;
  }

  // Options for the Year dropdown
  const yearOptions = ["I", "II", "III", "IV"];

  return (
    <LandingBanner>
      <div className={styles.addStudentContainer}>
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit} className={styles.addStudentForm}>
          <div className={styles.formGroup}>
            <label htmlFor="registerNumber">Register Number</label>
            <input
              type="text"
              id="registerNumber"
              name="registerNumber"
              value={formData.registerNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="purpose">Purpose</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Student
          </button>
        </form>
      </div>
    </LandingBanner>
  );
};

export default AddStudent;
