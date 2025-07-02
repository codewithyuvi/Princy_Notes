import React, { useEffect, useState } from "react";
import "./HeroNotes.css"; // Reuse same CSS if layout is same
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "./supabaseClient"; // Make sure the path is correct
import { useNavigate } from "react-router-dom";

const HeroPyq = () => {
  const [latestPyqs, setLatestPyqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchLatestPyqs = async () => {
      const { data, error } = await supabase
        .from("princy_pyq_syllabus")
        .select("*")
        .eq("type", "pyq")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching latest PYQs:", error);
      } else {
        setLatestPyqs(data);
      }
    };

    fetchLatestPyqs();
  }, []);

  return (
    <div className="notes-section">
      <h1 className="notes-heading">PYQ's</h1>
      <div className="notes-wrapper">
        <div className="ROW top-ROW">
          {latestPyqs.slice(0, 3).map((pyq) => (
            <div
              key={pyq.id}
              className="box"
              data-aos="fade-up"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/pdf-viewer", { state: pyq })}
            >
              <div className="dotlottie-player">
                <DotLottieReact
                  src="https://lottie.host/a91b1ff7-518b-4dcc-8a33-aaa4508ec67c/FZgp24NCiG.lottie"
                  loop
                  autoplay
                />
              </div>
              <p>{pyq.pdf_name}</p>
            </div>
          ))}
        </div>
        <div className="ROW bottom-ROW">
          {latestPyqs.slice(3, 5).map((pyq) => (
            <div
              key={pyq.id}
              className="box"
              data-aos="fade-up"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/pdf-viewer", { state: pyq })}
            >
              <div className="dotlottie-player">
                <DotLottieReact
                  src="https://lottie.host/a91b1ff7-518b-4dcc-8a33-aaa4508ec67c/FZgp24NCiG.lottie"
                  loop
                  autoplay
                />
              </div>
              <p>{pyq.pdf_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPyq;
