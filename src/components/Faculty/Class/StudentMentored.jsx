import React, { useState } from "react";
import { FaSearch, FaFileExport } from "react-icons/fa";
import LandingBanner from "../LandingBanner";
import styles from "../../../styles/Faculty/Mentor/ViewStudent.module.css";
import * as XLSX from "xlsx";

const StudentMentored = () => {
  const [students, setStudents] = useState([
    {
      registerNumber: "41110115",
      name: "Aravindan LU",
      purpose: "Project Guidance",
      addedBy: "John Doe",
      startDate: "2023-01-01",
      endDate: "2023-06-30",
      status: "ongoing",
    },
    {
      registerNumber: "41110130",
      name: "Arun Deva",
      purpose: "Internship Support",
      addedBy: "Jane Smith",
      startDate: "2023-02-15",
      endDate: "2023-07-15",
      status: "completed",
    },
    {
      registerNumber: "41110163",
      name: "Balasubramani E",
      purpose: "Research Assistance",
      addedBy: "Jane Smith",
      startDate: "2023-03-10",
      endDate: "2023-08-10",
      status: "ongoing",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.registerNumber.includes(searchTerm)
  );

  const handleExport = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const filename = `student-mentored-${currentDate}.xlsx`;

    const dataToExport = filteredStudents.map((student) => ({
      ...student,
      status: student.status === "ongoing" ? "Ongoing" : "Completed",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <LandingBanner>
      <div className={styles["form-container"]}>
        <div className={styles.content}>
          <div className={styles["top-options"]}>
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
            <div className={styles["export-button"]}>
              <button onClick={handleExport}>
                <FaFileExport style={{ marginRight: "8px" }} />
                Export
              </button>
            </div>
          </div>
          <div className={styles["student-table-wrapper"]}>
            <table className={styles["student-table"]}>
              <thead>
                <tr>
                  <th>Register Number</th>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Mentor Name</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className={styles["student-tbody"]}>
                {filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.registerNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.purpose}</td>
                    <td>{student.addedBy}</td>
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

export default StudentMentored;
