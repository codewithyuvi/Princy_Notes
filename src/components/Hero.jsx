import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../components/Hero.css";
import readingTime from "../assets/reading-time.svg";
import blob from "../assets/blob4.svg";
import AttractButton from "./AttractButton";

function Hero() {
  return (
    <div className="hero hero-bg position-relative py-5">
      {/* Blob in background */}
      <img
        src={blob}
        alt="Background Blob"
        className="position-absolute hero-blob"
      />

      <div className="container-fluid px-4 px-md-5">

        <div className="row align-items-center gx-5">
          {/* Image Column */}
          <div className="col-md-6 text-center mb-4 mb-md-0 position-relative">
            <img
              src={readingTime}
              alt="Reading Illustration"
              className="img-fluid floating-img hero-illustration"
            />
          </div>

          {/* Text Column */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold hero-heading mb-3">
              All Your <span className="gradient-text">Study Material</span> in
              One Place
            </h1>
            <p className="lead text-muted mb-4">
              Get Unit Wise Notes, PYQs, and Syllabus for every subject
            </p>
            <div className="p-10">
              <AttractButton onClick={() => document.getElementById("notes-section").scrollIntoView({ behavior: "smooth" })}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
