import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import styles from "../../styles/EventStyles.module.css";
import LandingBanner from "./LandingBanner";
import EnrollmentStatus from "./EnrollmentStatus"; // Import the new component

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [enrollmentEventId, setEnrollmentEventId] = useState(null);

  useEffect(() => {
    // Sample events with IDs and details for testing
    const sampleEvents = [
      {
        id: 1,
        title: "Sample Event 1",
        date: "2024-07-15T10:00:00Z",
        time: "10:00 AM",
        venue: "Sample Venue 1",
        poster: "https://via.placeholder.com/150",
        status: "OD Approved", // Sample status
      },
      {
        id: 2,
        title: "Sample Event 2",
        date: "2024-07-20T14:30:00Z",
        time: "02:30 PM",
        venue: "Sample Venue 2",
        poster: "https://via.placeholder.com/150",
        status: "OD Declined", // Sample status
      },
      {
        id: 3,
        title: "Sample Event 3",
        date: "2024-07-25T09:00:00Z",
        time: "09:00 AM",
        venue: "Sample Venue 3",
        poster: "https://via.placeholder.com/150",
        status: "Waiting for Approval", // Sample status
      },
      // Add more sample events as needed...
    ];

    setEvents(sampleEvents);
  }, []);

  const eventsPerPage = 5;
  const pageCount = Math.ceil(events.length / eventsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const handleEnroll = (eventId) => {
    setShowPopup(true);
    setEnrollmentEventId(eventId);
  };

  const confirmEnrollment = () => {
    alert("Event enrolled successfully!");
    setShowPopup(false);
  };

  const cancelEnrollment = () => {
    setShowPopup(false);
  };

  const renderEvents = () => {
    return events
      .slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage)
      .map((event) => (
        <div key={event.id} className={styles.event}>
          <div className={styles.eventHeader}>
            <div className={styles.eventDate}>
              <div className={styles.month}>
                {new Date(event.date).toLocaleString("default", {
                  month: "short",
                })}
              </div>
              <div className={styles.day}>{new Date(event.date).getDate()}</div>
            </div>
            <div className={styles.eventBrief}>
              <h3 className={styles.title}>{event.title}</h3>
              <EnrollmentStatus enrollmentEventId={event.id} />{" "}
              {/* <div className={styles.timeplace}>
                <p>Time: {event.time}</p>
                <p>Venue: {event.venue}</p>
              </div> */}
            </div>
            <div className={styles.expandButton}>
              <button
                type="button"
                aria-label="expand"
                className={styles.expandButtonIcon}
                onClick={() => toggleExpand(event.id)}
              >
                <FaChevronDown
                  className={`${styles.expandIcon} ${
                    expandedEventId === event.id ? styles.open : styles.closed
                  }`}
                />
              </button>
            </div>
          </div>
          <div
            className={`${styles.eventExpand} ${
              expandedEventId === event.id ? styles.expanded : ""
            }`}
          >
            {/* <div className={styles.timeplace}>
              <p>Time: {event.time}</p>
              <p>Venue: {event.venue}</p>
            </div> */}
            <div className={styles.posterList}>
              <img
                className={styles.posterImg}
                src={event.poster}
                alt="Event Poster"
              />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <LandingBanner>
      <div className={styles.eventsList}>
        <div id="eventsContainer">{renderEvents()}</div>
        <div className={styles.paginationBox}>
          <ReactPaginate
            previousLabel={<FaChevronLeft />}
            nextLabel={<FaChevronRight />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.paginationUl}
            previousLinkClassName={styles.paginationLink}
            nextLinkClassName={styles.paginationLink}
            disabledClassName={styles.paginationDisabled}
            activeClassName={"Mui-selected"}
          />
        </div>
      </div>
    </LandingBanner>
  );
};

export default Events;
