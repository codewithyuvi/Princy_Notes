import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { supabase } from "./supabaseClient.js";
import "./Header.css";
import Sidebar from "../adminPortalComponents/Sidebar.jsx";

function Header() {
  const navigate = useNavigate();

  //fetching PYQ Subject Names
  const [pyqSubject, setPYQSubject] = useState([]);
  useEffect(() => {
    const fetchPYQSubjects = async () => {
      const { data, error } = await supabase
        .from("princy_pyq_syllabus")
        .select("*")
        .eq("type", "pyq");

      if (error) {
        console.error("Error fetching PYQSubject: ", error);
      } else {
        setPYQSubject(data);
      }
    };

    fetchPYQSubjects();
  }, []);

  //  console.log(pyqSubject.map((item) => item.pdf_url));

  const [notesSubject, setNotesSubject] = useState([]);

  useEffect(() => {
    const fetchNotesSubjects = async () => {
      const { data, error } = await supabase
        .from("princy_pyq_syllabus")
        .select("*")
        .eq("type", "notes");

      if (error) {
        console.error("Error fetching PYQSubject: ", error);
      } else {
        setNotesSubject(data);
      }
    };

    fetchNotesSubjects();
  }, []);

  // console.log(notesSubject.map((item) => item.pdf_url));

  //fetching Syllabus
  const [semSyllabus, setsemSyllabus] = useState([]);
  useEffect(() => {
    const fetchSemSyllabus = async () => {
      const { data, error } = await supabase
        .from("princy_pyq_syllabus")
        .select("*")
        .eq("type", "syllabus");

      if (error) {
        console.error("Error fetching PYQSubject: ", error);
      } else {
        setsemSyllabus(data);
      }
    };

    fetchSemSyllabus();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom"
      style={{backgroundColor : "#5fc4e7"}}
    >
      <div className="container-fluid" >
        {/* Logo */}
        <a className="navbar-brand fw-bold text-primary" href="/">
          Edu Pro
        </a>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main nav links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                PYQs
              </a>
              <div className="dropdown-menu p-4" style={{ width: "300px" }}>
                <div className="row">
                  {/* Subject */}
                  <div>
                    <h6 className="dropdown-header border-bottom">
                      Choose Subject
                    </h6>

                    {pyqSubject.map((pyqSubjectName) => (
                      <a
                        key={pyqSubjectName.id}
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // 🛑 prevent anchor default reload
                          if (!pyqSubjectName.pdf_url) {
                            alert("No PDF URL found for this subject.");
                            return;
                          }
                          navigate("/pdf-viewer", { state: pyqSubjectName });
                        }}
                      >
                        {pyqSubjectName.subject}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Notes
              </a>
              <div className="dropdown-menu p-4" style={{ width: "300px" }}>
                <div className="row">
                  {/* Subject */}
                  <div>
                    <h6 className="dropdown-header border-bottom">
                      Choose Subject
                    </h6>

                    {notesSubject.map((notesSubjectName) => (
                      <a
                        key={notesSubjectName.id}
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          navigate(
                            `/notes/${encodeURIComponent(notesSubjectName.id)}`
                          )
                        }
                      >
                        {notesSubjectName.subject}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Syllabus
              </a>
              <div className="dropdown-menu p-4" style={{ width: "400px" }}>
                <div className="row">
                  {/* Subject */}
                  <div>
                    <h6 className="dropdown-header border-bottom">
                      Choose Semester
                    </h6>

                    {semSyllabus.map((semSyllabusYear) => (
                      <a
                        key={semSyllabusYear.id}
                        href="#"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();

                          if (!semSyllabusYear.pdf_url) {
                            alert("No syllabus PDF found for this semester.");
                            return;
                          }

                          navigate("/pdf-viewer", { state: semSyllabusYear });
                        }}
                      >
                        {semSyllabusYear.subject}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <a onClick={() => navigate("/Admin-Portal")}>Admin Portal</a>
          
        </div>
      </div>
    </nav>
  );
}

export default Header;
