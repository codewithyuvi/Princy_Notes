import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./UnitList.css";

function UnitList() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [units, setUnits] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/getType`,
          { params: { type: "notes" } }
        );
        setSubjects(res.data.data || []);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error loading subjects");
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubjectId) {
      setUnits([]);
      return;
    }
    const fetchUnits = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/subject`,
          { params: { subjectId: selectedSubjectId } }
        );
        setUnits(res.data.data || []);
        setMessage("");
      } catch (err) {
        setMessage(err.response?.data?.message || "Error loading units");
      }
    };
    fetchUnits();
  }, [selectedSubjectId]);

  const handleSubjectSelect = (subject) => {
    setSelectedSubjectId(subject._id);
    setSelectedSubjectName(subject.subjectName);
  };

  return (
    <div className="unitlist-container">
      <h2 className="notes-heading">Notes</h2>

      {!selectedSubjectId && (
  <>
    <h3 className="mb-4">Select Subject</h3>
    {subjects.length > 0 ? (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {subjects.map((subject) => (
          <div key={subject._id} className="col">
            <div
              className="card h-100 shadow-sm subject-card"
              role="button"
              tabIndex={0}
              onClick={() => handleSubjectSelect(subject)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubjectSelect(subject);
              }}
              aria-label={`Select subject ${subject.subjectName}`}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title text-center">{subject.subjectName}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-muted">{message || "No subjects found."}</p>
    )}
  </>
)}


      {selectedSubjectId && (
        <>
          <div className="subject-header d-flex justify-content-between align-items-center">
            <h3>Units for {selectedSubjectName}</h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSelectedSubjectId(null);
                setSelectedSubjectName("");
                setUnits([]);
              }}
            >
              Change Subject
            </button>
          </div>

          {units.length > 0 ? (
            <div className="notes-grid">
              {units.map((unit) => (
                <div
                  key={unit._id}
                  className="note-tile"
                  onClick={() => navigate("/pdf-viewer", { state: unit })}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter")
                      navigate("/pdf-viewer", { state: unit });
                  }}
                  aria-label={`Open PDF for unit ${unit.unitName}`}
                >
                  <DotLottieReact
                    src="https://lottie.host/417e868d-48eb-42a7-a80d-0f3fab58e56d/FxTxl3M21V.lottie"
                    loop
                    autoplay
                  />
                  <p className="note-title">{unit.fileName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{message || "No notes found for this subject."}</p>
          )}
        </>
      )}
    </div>
  );
}

export default UnitList;
