import React, { useEffect, useState } from "react";
import "./HeroNotes.css"; // Reuse same CSS if layout is same
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroPyq = () => {
  const navigate = useNavigate();

  const [pyqs, setPyqs] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    AOS.init({ duration: 1000 });
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

  return (
    <div className="notes-section">
      <h1 className="notes-heading">PYQ's</h1>
      <div className="notes-wrapper">
        <div className="ROW top-ROW">
          {pyqs.slice(0, 3).map((pyq) => (
            <div
              key={pyq._id}
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
              <p>{pyq.fileName}</p>
            </div>
          ))}
        </div>
        <div className="ROW bottom-ROW">
          {pyqs.slice(3, 5).map((pyq) => (
            <div
              key={pyq._id}
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
              <p>{pyq.fileName}</p>
            </div>
          ))}
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HeroPyq;
