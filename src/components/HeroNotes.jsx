import React, { useEffect, useState } from "react";
import "./HeroNotes.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "./supabaseClient"; // <-- make sure path is correct
import { useNavigate } from "react-router-dom";

const HeroNotes = () => {
  const [latestNotes, setLatestNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchLatestNotes = async () => {
      const { data, error } = await supabase
        .from("princy_notes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching latest notes:", error);
      } else {
        setLatestNotes(data);
      }
    };

    fetchLatestNotes();
  }, []);

  return (
    <div className="notes-section" id="notes-section">
      <h1 className="notes-heading">Notes</h1>
      <div className="notes-wrapper">
        <div className="ROW top-ROW" style={{cursor: "pointer"}}>
          {latestNotes.slice(0, 3).map((note) => (
            <div
              className="box"
              key={note.id}
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
              <p>{note.pdf_name}</p>
            </div>
          ))}
        </div>
        <div className="ROW bottom-ROW" style={{cursor: "pointer"}}>
          {latestNotes.slice(3, 5).map((note) => (
            <div
              className="box"
              key={note.id}
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
              <p>{note.pdf_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroNotes;
