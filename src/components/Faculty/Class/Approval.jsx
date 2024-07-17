import React, { useState } from "react";
import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaShareSquare,
} from "react-icons/fa";
import styles from "../../../styles/Faculty/ApprovalStyles.module.css";
import LandingBanner from "../LandingBanner";

const ApprovalPage = () => {
  const [approvals, setApprovals] = useState([
    {
      userName: "Aravindan",
      userRegno: "41110115",
      eventName: "EVENT NAME",
      eventType: "TECHNICAL",
      eventDate: "00/00/0000",
      eventVenue: "REMIBAI AUDITORIUM",
      brochureUrl: "https://example.com/brochure1.pdf",
      approved: null,
    },
    {
      userName: "Bala",
      userRegno: "41110230",
      eventName: "EVENT NAME",
      eventType: "TECHNICAL",
      eventDate: "00/00/0000",
      eventVenue: "REMIBAI AUDITORIUM",
      brochureUrl: "https://example.com/brochure2.pdf",
      approved: null,
    },
    {
      userName: "Jk Aravind",
      userRegno: "41110114",
      eventName: "EVENT NAME",
      eventType: "TECHNICAL",
      eventDate: "00/00/0000",
      eventVenue: "ECE SEMINAR HALL",
      brochureUrl: "https://example.com/brochure3.pdf",
      approved: null,
    },
    // Add more approvals as needed
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [action, setAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [brochureUrl, setBrochureUrl] = useState("");

  const handleAction = (index, actionType) => {
    setSelectedIndex(index);
    setAction(actionType);
    setShowModal(true);
  };

  const handleConfirm = () => {
    const newApprovals = [...approvals];
    if (action === "approve") {
      newApprovals[selectedIndex].approved = true;
    } else if (action === "decline") {
      newApprovals[selectedIndex].approved = false;
    }
    setApprovals(newApprovals);
    setShowModal(false);
  };

  const handleViewBrochure = (url) => {
    setBrochureUrl(url);
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <LandingBanner>
        <ApprovalSection
          approvals={approvals}
          onAction={handleAction}
          onViewBrochure={handleViewBrochure}
        />
        {showModal && action && (
          <ConfirmationModal
            action={action}
            onConfirm={handleConfirm}
            onCancel={() => setShowModal(false)}
          />
        )}
        {showModal && brochureUrl && (
          <BrochureModal
            url={brochureUrl}
            onCancel={() => {
              setBrochureUrl("");
              setShowModal(false);
            }}
          />
        )}
      </LandingBanner>
    </div>
  );
};

const ApprovalSection = ({ approvals, onAction, onViewBrochure }) => (
  <div className={styles.approvalSection}>
    {approvals.map((approval, index) => (
      <ApprovalCard
        key={index}
        index={index}
        {...approval}
        onApprove={() => onAction(index, "approve")}
        onDecline={() => onAction(index, "decline")}
        onViewBrochure={() => onViewBrochure(approval.brochureUrl)}
      />
    ))}
  </div>
);

const ApprovalCard = ({
  userName,
  userRegno,
  eventName,
  eventType,
  eventDate,
  eventVenue,
  brochureUrl,
  approved,
  onApprove,
  onDecline,
  onViewBrochure,
}) => (
  <div
    className={`${styles.card} ${
      approved === true
        ? styles.approved
        : approved === false
        ? styles.declined
        : ""
    }`}
  >
    <div className={styles.cardContent}>
      <div className={styles.circle}>
        <FaUser />
      </div>
      <div className={styles.eventInfo}>
        <p className={styles.userName}>{userName}</p>
        <p className={styles.userRegno}>{userRegno}</p>
        <p className={styles.eventName}>{eventName}</p>
        <p className={styles.viewBrochure} onClick={onViewBrochure}>
          View Brochure <FaShareSquare />
        </p>
        <p className={styles.eventType}>{eventType}</p>
        <p className={styles.eventDate}>{eventDate}</p>
        <p className={styles.eventVenue}>{eventVenue}</p>
      </div>
      <div className={styles.buttons}>
        {approved === true ? (
          <button className={styles.approvedText}>
            <FaCheckCircle /> APPROVED
          </button>
        ) : approved === false ? (
          <button className={styles.declinedText}>
            <FaTimesCircle /> DECLINED
          </button>
        ) : (
          <>
            <button className={styles.approveBtn} onClick={onApprove}>
              <FaCheckCircle /> APPROVE
            </button>
            <button className={styles.declineBtn} onClick={onDecline}>
              <FaTimesCircle /> DECLINE
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

const ConfirmationModal = ({ action, onConfirm, onCancel }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h3>{`Are you sure you want to ${
        action === "approve" ? "approve" : "decline"
      } this event?`}</h3>
      <div className={styles.modalButtons}>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          Confirm
        </button>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const BrochureModal = ({ url, onCancel }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h3>Event Brochure</h3>
      <iframe src={url} width="100%" height="400px" title="Brochure" />
      <div className={styles.modalButtons}>
        <button className={styles.cancelBtn} onClick={onCancel}>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ApprovalPage;
