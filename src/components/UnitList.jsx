import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import "./UnitList.css"; // Create this new CSS file
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function UnitList() {
  const { subjectId } = useParams();
  const [notes, setNotes] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjectNameAndNotes = async () => {
      const { data: subjectData, error: subjectError } = await supabase
        .from("princy_pyq_syllabus")
        .select("subject")
        .eq("id", subjectId)
        .single();

      if (subjectError) {
        console.error("Error fetching subject name:", subjectError);
      } else {
        setSubjectName(subjectData.subject);
      }

      const { data: notesData, error: notesError } = await supabase
        .from("princy_notes")
        .select("*")
        .eq("subject_id", subjectId);

      if (notesError) {
        console.error("Error fetching notes:", notesError);
      } else {
        setNotes(notesData);
      }
    };

    fetchSubjectNameAndNotes();
  }, [subjectId]);

  return (
    <div className="unitlist-container">
      <h2 className="notes-heading">Notes for {subjectName}</h2>
      {notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-tile"
              onClick={() => navigate("/pdf-viewer", { state: note })}
            >
              <DotLottieReact
                src="https://lottie.host/417e868d-48eb-42a7-a80d-0f3fab58e56d/FxTxl3M21V.lottie"
                loop
                autoplay
              />
              <p className="note-title">{note.pdf_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-notes">No notes found for this subject.</p>
      )}
    </div>
  );
}

export default UnitList;
