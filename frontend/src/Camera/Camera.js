import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Camera.css";
import "../App.css";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [error, setError] = useState(null);
  const [imageFormat] = useState("image/png");
  const [imageDataUrl, setImageDataUrl] = useState(null);
  // const [saveMessage, setSaveMessage] = useState("");
  const navigate = useNavigate();

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

      const dataUrl = canvasRef.current.toDataURL(imageFormat);
      setImageDataUrl(dataUrl);
    }
  };

  const retakeImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCaptured(false);
    setImageDataUrl(null);
    startCamera();
  };

  const uploadImageAndNavigate = async () => {
    if (imageDataUrl) {
      const payload = {
        base64Image: imageDataUrl,
      };
      console.log(payload);

      // Send the image to your backend
      try {
        const uploadResponse = await fetch("YOUR_BACKEND_ENDPOINT_HERE", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indicates that the request body is JSON
          },
          body: JSON.stringify(payload), // Convert the payload object to a JSON string
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        // setSaveMessage("Image uploaded successfully!");

        // Navigate to the Process component after successful upload
        navigate("/process");
      } catch (error) {
        console.error("Error uploading image:", error);
        // setSaveMessage("Failed to upload image.");
      } finally {
        // Optional: Reset the camera after upload
        retakeImage();
      }
    }
  };

  // const saveImage = () => {
  //   if (imageDataUrl) {
  //     const link = document.createElement("a");
  //     link.href = imageDataUrl;
  //     link.download = `captured_image.${imageFormat.split("/")[1]}`;
  //     link.click();

  //     setSaveMessage("Image saved!");

  //     // Optionally restart camera or perform another action
  //     startCamera();

  //     setTimeout(() => {
  //       setSaveMessage("");
  //     }, 2000);
  //   }
  // };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          display: isCaptured ? "none" : "block",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ display: isCaptured ? "block" : "none" }}
      />
      {!isCaptured && (
        <button onClick={() => navigate("/about")} className="button save">
          About
        </button>
      )}
      {isCaptured ? (
        <>
          <button onClick={retakeImage} className="button retake">
            Retake Image
          </button>
          {/* <button onClick={saveImage} className="button save">
            Save Image
          </button> */}
          <button onClick={uploadImageAndNavigate} className="button save">
            Process
          </button>
        </>
      ) : (
        <button onClick={captureImage} className="button capture">
          Capture Image
        </button>
      )}

      {/* {saveMessage && (
        <div className="overlay">
          <div className="message">{saveMessage}</div>
        </div>
      )} */}
    </div>
  );
}

export default Camera;
