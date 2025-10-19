import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="d-inline-flex sidebar-g-container ">
      <div className="border border-black me-5 ps-4 pt-3 pe-4 rounded-3">
        <div className="avatar">
          {/* will add later */}
        </div>
        <div className="sidebar-button-parent">
          <p className="sidebar-button">
            <Link to="/Admin-Portal/addNewSubject">Add New Subject</Link>{" "}
          </p>
        </div>
        <div className="sidebar-button-parent">
          <p className="sidebar-button">
            <Link to="/Admin-Portal/uploadPdf">Upload a New Pdf</Link>
          </p>
        </div>
        <div className="sidebar-button-parent">
          <p className="sidebar-button">
            <Link to="/Admin-Portal/all-pyqs">PYQ's</Link>
          </p>
        </div>
        <div className="sidebar-button-parent">
          <p className="sidebar-button">
            <Link to="/Admin-Portal/all-notes">Notes</Link>
          </p>
        </div>
        <div className="sidebar-button-parent">
          <p className="sidebar-button">
            <Link to="/Admin-Portal/all-syllabus">Syllabus</Link>
          </p>
        </div>
      </div>
    </div>
    //post- add a new subject button
    //post- upload a new pdf
    //get + patch uploaded pyq
    //get + patch uploaded syllabus
    //get + patch uploaded notes
  );
};

export default Sidebar;
