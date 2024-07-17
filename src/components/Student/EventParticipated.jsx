import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaDownload,
} from "react-icons/fa";
import styles from "../../styles/EventStyles.module.css";
import LandingBanner from "./LandingBanner";

const EventsParticiapted = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    // Load events from localStorage or use default sample events
    // const storedEvents = JSON.parse(localStorage.getItem("events"));
    const sampleEvents = [
      {
        id: 1,
        title: "Sample Event 1",
        date: "2024-07-15T10:00:00Z",
        time: "10:00 AM",
        venue: "Sample Venue 1",
        status: "Upcoming",
        poster: "https://via.placeholder.com/150",
        certificateUrl: "/certificates/sample_event_1_certificate.pdf", // Example URL for certificate
      },
      {
        id: 2,
        title: "Sample Event 2",
        date: "2024-07-20T14:30:00Z",
        time: "02:30 PM",
        venue: "Sample Venue 2",
        status: "Cancelled",
        poster: "https://via.placeholder.com/150",
        certificateUrl: "/certificates/sample_event_2_certificate.pdf", // Example URL for certificate
      },
      // Add more sample events here...
    ];

    setEvents(sampleEvents);
  }, []);

  useEffect(() => {
    // Save events to localStorage whenever events state changes
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const eventsPerPage = 5;
  const pageCount = Math.ceil(events.length / eventsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
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
              <div className={styles.timeplace}>
                <p>Time: {event.time}</p>
                <p>Venue: {event.venue}</p>
                <p>Status: {event.status}</p>
              </div>
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
            {/* <div className={styles.posterList}>
              <img
                className={styles.posterImg}
                src={event.poster}
                alt="Event Poster"
              />
            </div> */}
            <div className={styles.certificateContainer}>
              <embed
                src={event.certificateUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              />
              <button
                className={styles.downloadButton}
                onClick={() => handleDownloadCertificate(event.certificateUrl)}
              >
                <FaDownload className={styles.downloadIcon} />
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      ));
  };

  const handleDownloadCertificate = (certificateUrl) => {
    // Simulate download functionality
    window.open(certificateUrl, "_blank");
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

export default EventsParticiapted;
