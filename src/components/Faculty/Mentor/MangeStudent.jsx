import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import LandingBanner from "../LandingBanner"; // Ensure correct path
import styles from "../../../styles/Faculty/Mentor/ManageStudents.module.css";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    registerNumber: "",
    name: "",
    purpose: "",
    startDate: "",
    endDate: "",
    department: "",
    year: "",
    section: "",
    email: "",
    contactNumber: "",
    status: "ongoing", // Default status
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFormData({ ...student });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? { ...formData } : student
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setSelectedStudent(null); // Reset selected student after update
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registerNumber.includes(searchTerm)
  );

  return (
    <LandingBanner>
      <div className={styles.manageStudentsContainer}>
        <h2>Student List</h2>
        <div className={styles["search-bar"]}>
          <FaSearch className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search by Register Number"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles["search-input"]}
          />
        </div>
        <div className={styles.studentsList}>
          <ul className={styles.studentGrid}>
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <button
                  className={styles.studentButton}
                  onClick={() => handleStudentSelect(student)}
                >
                  {student.name} ({student.registerNumber})
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedStudent && (
          <form onSubmit={handleSubmit} className={styles.updateStudentForm}>
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
                {["I", "II", "III", "IV"].map((year) => (
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
              Update Student
            </button>
          </form>
        )}
        <div className={styles.addButtonContainer}>
          <Link to="/mentor/add-student" className={styles.addButton}>
            Add New Student
          </Link>
        </div>
      </div>
    </LandingBanner>
  );
};

export default ManageStudents;
