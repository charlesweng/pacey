import React from "react";
import { useNavigate } from "react-router-dom";
// import "./About.css";
// import "../App.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>About This Project</h1>
      <p>
        This project is a web application that utilizes OpenCV.js to capture and
        process images using your device's camera. The application is designed
        to provide a simple and interactive interface for users to take photos
        and apply various computer vision algorithms.
      </p>
      <h2>What we did</h2>
      <ul>
        <li>Used Python Tesseract OCR module to read text on image.</li>
        <li>Capture images in real-time.</li>
        <li>Process captured images with OpenCV functions.</li>
        <li>Interactive user interface for easy navigation.</li>
      </ul>

      <h2>Features</h2>
      <ul>
        <li>Access the device camera for image capturing.</li>
        <li>Capture images in real-time.</li>
        <li>Process captured images with OpenCV functions.</li>
        <li>Interactive user interface for easy navigation.</li>
      </ul>
      <h2>How to Use</h2>
      <ol>
        <li>Navigate to the Camera page using the button below.</li>
        <li>Grant camera access when prompted.</li>
        <li>Capture an image and observe the processing results.</li>
      </ol>
      <div className="button-container">
        <button onClick={() => navigate("/camera")} className="button retake">
          Go to Camera
        </button>
      </div>
    </div>
  );
}

export default About;
