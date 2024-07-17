import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./components/Login.jsx";
import ProfilePage from "./components/Student/Profile.jsx";
import LandingFaculty from "./components/Faculty/LandingFaculty.jsx";
import AddStudent from "./components/Faculty/Mentor/AddStudent.jsx";
import ApprovalPage from "./components/Faculty/Class/Approval.jsx"; // Ensure the correct path to ApprovalPage
import LandingBanner from "./components/Student/LandingBanner.jsx";
import ViewStudent from "./components/Faculty/Mentor/ViewStudent.jsx";
import ViewStudents from "./components/Faculty/ViewStudents.jsx";
import StudentMentored from "./components/Faculty/Class/StudentMentored.jsx";
import ViewEvent from "./components/Student/ViewEvents.jsx";
import EnrollEvent from "./components/Student/EnrollAnEvent.jsx";
import ViewEventFaculty from "./components/Faculty/Event/ViewEvent.jsx";
import AddEvent from "./components/Faculty/Event/AddEvent.jsx";
import Approval from "./components/Student/Aproved.jsx";
import ManageStudents from "./components/Faculty/Mentor/MangeStudent.jsx";
import EventsParticiapted from "./components/Student/EventParticipated.jsx";
// import EventForm from "./components/Faculty/Event/EventForm.jsx";
// import EventManagement from "./components/Faculty/Event/EventManagement.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/view-event" element={<ViewEvent />} />
        <Route path="/upcoming-event" element={<EnrollEvent />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/events-participated" element={<EventsParticiapted />} />

        <Route path="/faculty" element={<LandingFaculty />} />
        <Route path="/view-student" element={<ViewStudents />} />

        <Route path="/class/mentored" element={<StudentMentored />} />
        <Route path="/class/approval" element={<ApprovalPage />} />

        <Route path="/event/view-event" element={<ViewEventFaculty />} />
        <Route path="/event/add-event" element={<AddEvent />} />
        {/* <Route path="/faculty/events" element={<EventManagement />} /> */}
        {/* <Route path="/faculty/events" element={<EventManagement />} /> */}

        <Route path="/mentor/add-student" element={<AddStudent />} />
        <Route path="/mentor/view-student" element={<ViewStudent />} />
        <Route path="/mentor/update-student" element={<ManageStudents />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
