import React from "react";
import { useNavigate } from "react-router-dom";
// import "./About.css";
// import "../App.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>About This Project</h1>
      <p>Pacemaker</p>
      <h2>What we did</h2>
      <ul>
        <li>Used Python Tesseract OCR module to read text on image.</li>
        <li>Capture images in real-time.</li>
      </ul>

      <h2>Features</h2>
      <ul>
        <li>Access the device camera for image capturing.</li>
        <li>Process captured image into meaningful data.</li>
      </ul>
      <h2>How to Use</h2>
      <ol>
        <li>Navigate to the Camera page using the button below.</li>
        <li>Grant camera access when prompted and capture image.</li>
        <li>Process the image and reap the benefits</li>
      </ol>
      <div className="button-container">
        <button onClick={() => navigate("/camera")} className="button retake">
          Go to Camera
        </button>
        <button onClick={() => navigate("/table")} className="button retake">
          Existing Data
        </button>
      </div>
    </div>
  );
}

export default About;
