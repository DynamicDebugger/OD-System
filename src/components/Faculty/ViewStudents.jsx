import React, { useState } from "react";
import { FaSearch, FaFileExport } from "react-icons/fa";
import LandingBanner from "./LandingBanner";
import styles from "../../styles/Faculty/ViewStudents.module.css"; // Importing only the module CSS
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ViewStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  // Updated students array with "eventName" added
  const students = [
    {
      regNumber: "41110115",
      name: "Aravindan LU",
      email: "aravindanlu@gmail.com",
      year: "IV",
      sec: "A2",
      status: "Pending",
      eventName: "Event A",
    },
    {
      regNumber: "41110130",
      name: "Arun Deva",
      email: "deva.arun@gmail.com",
      year: "IV",
      sec: "A3",
      status: "Ongoing",
      eventName: "Event B",
    },
    {
      regNumber: "41110163",
      name: "Balasubramani E",
      email: "balasubrmani285@gmail.com",
      year: "IV",
      sec: "A3",
      status: "Ongoing",
      eventName: "Event C",
    },
    {
      regNumber: "41110320",
      name: "Dhivya G",
      email: "abcdefg@gmail.com",
      year: "IV",
      sec: "B1",
      status: "Pending",
      eventName: "Event A",
    },
    {
      regNumber: "42210163",
      name: "Nagendra Desari",
      email: "abcdefg@gmail.com",
      year: "III",
      sec: "A5",
      status: "Pending",
      eventName: "Event B",
    },
  ];

  const statusMapping = {
    Pending: "Waiting for Approval",
    Ongoing: "OD Approved",
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.regNumber.includes(searchTerm) &&
      (year === "" || student.year === year) &&
      (section === "" || student.sec === section)
    );
  });

  const exportToExcel = () => {
    const filteredData = filteredStudents.map((student) => ({
      "Register Number": student.regNumber,
      Name: student.name,
      "Email ID": student.email,
      "Event Name": student.eventName,
      "Current Status": statusMapping[student.status] || student.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Students");
    const today = new Date();
    const filename = `student-${year}-${section}-${today.getFullYear()}${(
      "0" +
      (today.getMonth() + 1)
    ).slice(-2)}${("0" + today.getDate()).slice(-2)}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <LandingBanner>
      <div className={styles.studentTableContainer}>
        <div className={styles.searchAndFilter}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Register Number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.filters}>
            <div className={styles.dropdown}>
              <label>Year:</label>
              <select value={year} onChange={handleYearChange}>
                <option value="">All</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
            <div className={styles.dropdown}>
              <label>Section:</label>
              <select value={section} onChange={handleSectionChange}>
                <option value="">All</option>
                {Array.from({ length: 25 }, (_, i) => {
                  const sectionLetter = String.fromCharCode(
                    65 + Math.floor(i / 5)
                  );
                  const sectionNumber = (i % 5) + 1;
                  return (
                    <option
                      key={i}
                      value={`${sectionLetter}${sectionNumber}`}
                    >{`${sectionLetter}${sectionNumber}`}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <span>DEPT: B.E</span>
          <span>BRANCH: CSE</span>
          <span>CLASS: {section || "All"}</span>
          <span>YEAR: {year || "All"}</span>
        </div>
        <div className={styles.exportButton}>
          <button onClick={exportToExcel}>
            <FaFileExport style={{ marginRight: "8px" }} />
            Export
          </button>
        </div>
        <div className={styles.studentTableWrapper}>
          <table className={styles.studentTable}>
            <thead>
              <tr>
                <th>Register Number</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Event Name</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.regNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.eventName}</td>
                  <td
                    className={`${styles.status} ${
                      styles[student.status.toLowerCase()]
                    }`}
                  >
                    {statusMapping[student.status] || student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LandingBanner>
  );
};

export default ViewStudents;
