import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Princy Notes</h3>
          <p>
            Your trusted partner for easy access to PYQs, notes, and syllabus.  
            Study smart, score high!
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/notes">Notes</a></li>
            <li><a href="/pyqs">PYQs</a></li>
            <li><a href="/syllabus">Syllabus</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2025 Princy Notes. Made with ❤️ for students. <br />
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/yuvrajbansal"
            target="_blank"
            rel="noreferrer"
            className="footer-credit-link"
          >
            Yuvraj Bansal
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
