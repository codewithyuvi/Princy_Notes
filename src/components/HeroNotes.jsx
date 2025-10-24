import React, { useEffect, useState } from "react";
import "./HeroNotes.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroNotes = () => {
    const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
      const [message, setMessage] = useState();
  
    useEffect(() => {
      AOS.init({ duration: 1000 });
      fetchNotes();
    }, []);
  
    async function fetchNotes() {
      try {
        const queryParams = {
          subjectId: "68fa0c10b98e2e8c0263bbc2",
        };
        // console.log(queryParams);
  
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/subject`,
          { params: queryParams }
        );
        // console.log(res.data.data);
  
        setNotes(res.data.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setMessage(err.response.data.message || "can't GET");
        } else {
          setMessage("error");
        }
      }
    }
  return (
    <div className="notes-section" id="notes-section">
      <h1 className="notes-heading">Notes</h1>
      <div className="notes-wrapper">
        <div className="ROW top-ROW" style={{cursor: "pointer"}}>
          {notes.slice(0, 3).map((note) => (
            <div
              className="box"
              key={note._id}
              data-aos="fade-up"
              onClick={() => navigate("/pdf-viewer", { state: note })}
            >
              <div className="dotlottie-player">
                <DotLottieReact
                  src="https://lottie.host/417e868d-48eb-42a7-a80d-0f3fab58e56d/FxTxl3M21V.lottie"
                  loop
                  autoplay
                />
              </div>
              <p>{note.fileName}</p>
            </div>
          ))}
        </div>
        <div className="ROW bottom-ROW" style={{cursor: "pointer"}}>
          {notes.slice(3, 5).map((note) => (
            <div
              className="box"
              key={note._id}
              data-aos="fade-up"
              onClick={() => navigate("/pdf-viewer", { state: note })}
            >
              <div className="dotlottie-player">
                <DotLottieReact
                  src="https://lottie.host/417e868d-48eb-42a7-a80d-0f3fab58e56d/FxTxl3M21V.lottie"
                  loop
                  autoplay
                />
              </div>
              <p>{note.fileName}</p>
            </div>
          ))}
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HeroNotes;
