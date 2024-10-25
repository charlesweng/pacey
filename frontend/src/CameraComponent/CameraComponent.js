import React, { useRef, useEffect, useState } from "react";
import "./CameraComponent.css"; // Import the CSS file

function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [error, setError] = useState(null);
  const [imageFormat, setImageFormat] = useState("image/png"); // Default format
  const [imageDataUrl, setImageDataUrl] = useState(null); // Store the image data URL
  const [saveMessage, setSaveMessage] = useState(""); // Message to display after saving

  // Function to start the camera
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setError("Error accessing the camera. Please check permissions.");
      console.error("Error accessing the camera", error);
    }
  };

  useEffect(() => {
    startCamera();

    const videoElement = videoRef.current;

    // Cleanup camera stream on component unmount
    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setIsCaptured(true);

      // Get image data URL in the selected format
      const dataUrl = canvasRef.current.toDataURL(imageFormat);
      setImageDataUrl(dataUrl); // Store the image data URL
      console.log(dataUrl); // Use this data URL to display or save the image
    }
  };

  const retakeImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCaptured(false);
    setImageDataUrl(null); // Clear the stored image data URL

    // Restart the camera stream
    startCamera();
  };

  const saveImage = () => {
    if (imageDataUrl) {
      const link = document.createElement("a");
      link.href = imageDataUrl;
      link.download = `captured_image.${imageFormat.split("/")[1]}`; // Use the format as file extension
      link.click();

      // Show the "Image saved" message
      setSaveMessage("Image saved!");

      // Restart the camera stream after saving the image
      startCamera();

      // Clear the message after 2 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          display: isCaptured ? "none" : "block",
          width: "100%",
          height: "auto",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ display: isCaptured ? "block" : "none" }}
      />

      {!isCaptured && (
        <div>
          <p>Select image format:</p>
          <label>
            <input
              type="radio"
              value="image/png"
              checked={imageFormat === "image/png"}
              onChange={() => setImageFormat("image/png")}
            />
            PNG
          </label>
          <label>
            <input
              type="radio"
              value="image/jpeg"
              checked={imageFormat === "image/jpeg"}
              onChange={() => setImageFormat("image/jpeg")}
            />
            JPEG
          </label>
        </div>
      )}

      <button onClick={retakeImage} className="button">
        Retake Image
      </button>
      <button onClick={captureImage} className="button">
        Capture Image
      </button>
      {isCaptured && (
        <button onClick={saveImage} className="button">
          Save Image
        </button>
      )}

      {/* Overlay for save message */}
      {saveMessage && (
        <div className="overlay">
          <div className="message">{saveMessage}</div>
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
