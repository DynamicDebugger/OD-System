import React, { useState, useEffect } from "react";
import styles from "../../styles/EnrollmentStatus.module.css";

const EnrollmentStatus = ({ enrollmentEventId }) => {
  const [status, setStatus] = useState("Waiting for Approval");

  useEffect(() => {
    const fetchEnrollmentStatus = () => {
      const sampleStatuses = {
        1: "OD Approved",
        2: "OD Declined",
        3: "Waiting for Approval",
      };

      const eventStatus =
        sampleStatuses[enrollmentEventId] || "Waiting for Approval";
      setStatus(eventStatus);
    };

    fetchEnrollmentStatus();
  }, [enrollmentEventId]);

  const getStatusClass = () => {
    switch (status) {
      case "OD Approved":
        return styles.approved;
      case "OD Declined":
        return styles.declined;
      case "Waiting for Approval":
      default:
        return styles.waiting;
    }
  };

  return (
    <div className={`${styles.statusContainer} ${getStatusClass()}`}>
      <p className={styles.statusText}>
        <span>{status}</span>
      </p>
    </div>
  );
};

export default EnrollmentStatus;
