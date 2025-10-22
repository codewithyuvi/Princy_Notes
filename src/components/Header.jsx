import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";
import { AuthContext } from "../AuthContext.jsx";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const { authenticated } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );

      // Update auth state
      setAuthenticated(false);

      // Redirect to login or home page
      {
        authenticated ? (
          <div className="d-flex gap-3 align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/Admin-Portal")}
            >
              Admin Portal
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
        );
      }
      {
        authenticated ? (
          <div className="d-flex gap-3 align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/Admin-Portal")}
            >
              Admin Portal
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
        );
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  const [pyqs, setPyqs] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    fetchPyq();
  }, []);

  async function fetchPyq() {
    try {
      const queryParams = {
        type: "pyq",
      };
      // console.log(queryParams);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getType`,
        { params: queryParams }
      );
      // console.log(res.data.data);

      setPyqs(res.data.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "can't GET");
      } else {
        setMessage("error");
      }
    }
  }

  //  console.log(pyqSubject.map((item) => item.pdf_url));
  const [subjects, getSubjects] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  async function fetchSubject() {
    try {
      const queryParams = {
        type: "notes",
      };

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getType`,
        { params: queryParams }
      );
      getSubjects(res.data.data);
      // console.log(res.data.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Something went");
      } else {
        setMessage("error");
      }
    }
  }

  // console.log(notesSubject.map((item) => item.pdf_url));

  //fetching Syllabus
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  async function fetchSyllabus() {
    try {
      const queryParams = {
        type: "syllabus",
      };
      // console.log(queryParams);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getType`,
        { params: queryParams }
      );
      // console.log(res.data.data);

      setSyllabus(res.data.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "can't GET");
      } else {
        setMessage("error");
      }
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light border-bottom"
      style={{ backgroundColor: "#5fc4e7" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-primary" href="/">
          Edu Pro
        </a>

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

                    {pyqs.map((i, n) => (
                      <a
                        key={i._id}
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (!i.fileName) {
                            alert("No PDF URL found for this subject.");
                            return;
                          }
                          navigate("/pdf-viewer", { state: i });
                        }}
                      >
                        {i.fileName}
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
                onClick={() => navigate(`/notes/0}`)}
              >
                Notes
              </a>
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

                    {syllabus.map((i, n) => (
                      <a
                        key={i._id}
                        href="#"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();

                          if (!i.fileUrl) {
                            alert("No syllabus PDF found for this semester.");
                            return;
                          }

                          navigate("/pdf-viewer", { state: i });
                        }}
                      >
                        {i.fileName}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ul>

          {authenticated ? (
            <div className="d-flex gap-3 align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => navigate("/Admin-Portal")}
              >
                Admin Portal
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/Login")}
            >
              Admin Login
            </button>
          )}
        </div>
      </div>
      {message && <p>{message}</p>}
    </nav>
  );
}

export default Header;
