import React, { useState, useEffect } from "react";
import { FaSearch, FaFileExport } from "react-icons/fa";
import LandingBanner from "../LandingBanner"; // Ensure you have the correct path
import styles from "../../../styles/Faculty/Mentor/ViewStudents.module.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ViewStudent = () => {
  const [students, setStudents] = useState([
    {
      registerNumber: "41110115",
      name: "Aravindan LU",
      purpose: "Event participation",
      year: "IV",
      section: "A2",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      status: "ongoing",
    },
    {
      registerNumber: "41110130",
      name: "Arun Deva",
      purpose: "Project mentoring",
      year: "IV",
      section: "A3",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      status: "completed",
    },
    {
      registerNumber: "41110163",
      name: "Balasubramani E",
      purpose: "Research assistance",
      year: "IV",
      section: "A3",
      startDate: "2023-08-01",
      endDate: "2023-08-31",
      status: "ongoing",
    },
    {
      registerNumber: "41110320",
      name: "Dhivya G",
      purpose: "Event coordination",
      year: "IV",
      section: "B1",
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      status: "ongoing",
    },
    {
      registerNumber: "42210163",
      name: "Nagendra Desari",
      purpose: "Volunteer training",
      year: "III",
      section: "A5",
      startDate: "2023-10-01",
      endDate: "2023-10-31",
      status: "completed",
    },
    {
      registerNumber: "41110177",
      name: "John Doe",
      purpose: "Internship supervision",
      year: "IV",
      section: "A2",
      startDate: "2023-07-15",
      endDate: "2023-08-15",
      status: "completed",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.registerNumber.includes(searchTerm)
  );

  const handleExport = () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const filename = `student-mentored-${currentDate}.xlsx`;

    // Map filtered students to format status and prepare for export
    const dataToExport = filteredStudents.map((student) => ({
      "Register Number": student.registerNumber,
      Name: student.name,
      Purpose: student.purpose,
      Year: student.year,
      Section: student.section,
      Duration: `${student.startDate} - ${student.endDate}`,
      Status: student.status === "ongoing" ? "Ongoing" : "Completed",
    }));

    // Convert to Excel format and initiate download
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <LandingBanner>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <div className={styles.topOptions}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by Register Number"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.exportButton}>
              <button onClick={handleExport}>
                <FaFileExport style={{ marginRight: "8px" }} />
                Export
              </button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Register Number</th>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Year</th>
                  <th>Section</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.registerNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.purpose}</td>
                    <td>{student.year}</td>
                    <td>{student.section}</td>
                    <td>
                      {student.startDate} - {student.endDate}
                    </td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          student.status === "ongoing"
                            ? styles.ongoing
                            : styles.completed
                        }`}
                      >
                        {student.status === "ongoing" ? "Ongoing" : "Completed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LandingBanner>
  );
};

export default ViewStudent;
