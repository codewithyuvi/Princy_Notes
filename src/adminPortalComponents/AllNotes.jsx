import React, { useEffect, useState } from "react";
import axios from "axios";

function AllNotes() {
  const [subjects, getSubjects] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState();
  const [selectedSubjectName, setSelectedSubjectName] = useState("");

  const [units, getUnits] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  useEffect(() => {
    fetchUnits();
  });

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

  async function selectedSubject(i) {
    setSelectedSubjectId(i._id);
    setSelectedSubjectName(i.subjectName);
  }

  async function fetchUnits() {
    try {
      const queryParams = {
        subjectId: selectedSubjectId,
      };

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/subject`,
        { params: queryParams }
      );
      getUnits(res.data.data);
      // console.log(res.data.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Something went");
      } else {
        setMessage("error");
      }
    }
  }
  return (
    <div className="d-inline-flex flex-column">
      <h1>Notes</h1>
      {selectedSubjectId ? (
        <ol>
          All units for {selectedSubjectName}
          {units.length > 0 ? (
            units.map((i, n) => (
              <li key={n}>
                <a href={i.fileUrl} target="_blank" rel="noopener noreferrer">
                  {i.unitName}
                </a>
              </li>
            ))
          ) : (
            <li>No Subject Found</li>
          )}
        </ol>
      ) : (
        <ol>
          {subjects.length > 0 ? (
            subjects.map((i, n) => (
              <li key={n} onClick={() => selectedSubject(i)}>
                {i.subjectName}
              </li>
            ))
          ) : (
            <li>No Subject Found</li>
          )}
        </ol>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default AllNotes;
