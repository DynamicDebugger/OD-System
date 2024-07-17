import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingBanner from "../LandingBanner";
import styles from "../../../styles/Faculty/Event/AddEvent.module.css";

// Popup component for displaying confirmation message
const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [poster, setPoster] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true); // Show confirmation popup
  };

  const handleConfirmCreate = () => {
    const reader = new FileReader();
    reader.onload = () => {
      const eventData = {
        id: Date.now(),
        title,
        date,
        time,
        venue,
        poster: reader.result,
        status: "Upcoming",
        month: new Date(date).toLocaleString("default", { month: "short" }),
        day: new Date(date).getDate().toString().padStart(2, "0"),
      };
      try {
        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(eventData);
        localStorage.setItem("events", JSON.stringify(events));

        setPopupMessage("Event created successfully!");
        setShowConfirmation(false); // Hide confirmation popup
        navigate("/event/view-event");
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          setPopupMessage(
            "Local storage quota exceeded. Unable to save the event."
          );
        } else {
          console.error("Error saving event:", error);
          setPopupMessage("Error saving event. Please try again.");
        }
      }
    };

    if (poster) {
      reader.readAsDataURL(poster);
    } else {
      setPopupMessage("Please upload a poster image");
    }
  };

  const handleCancelCreate = () => {
    setShowConfirmation(false); // Hide confirmation popup
  };

  return (
    <LandingBanner>
      <div className={styles.container}>
        <h2>Create A New Event</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="date" className={styles.label}>
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="time" className={styles.label}>
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="venue" className={styles.label}>
            Venue:
          </label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="poster" className={styles.label}>
            Poster Image:
          </label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            onChange={(e) => setPoster(e.target.files[0])}
            required
            className={styles.inputFile}
          />

          <button type="submit" className={styles.button}>
            Create Event
          </button>
        </form>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to create this event?"
          onConfirm={handleConfirmCreate}
          onCancel={handleCancelCreate}
        />
      )}

      {/* Popup message for event creation status */}
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
      )}
    </LandingBanner>
  );
};

export default AddEvent;
