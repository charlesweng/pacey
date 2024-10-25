import React, { useRef, useEffect, useState } from "react";

function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera", error);
      }
    };

    startCamera();

    // Cleanup camera stream on component unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
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
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        style={{ display: isCaptured ? "none" : "block" }}
      />
      <canvas
        ref={canvasRef}
        style={{ display: isCaptured ? "block" : "none" }}
      />
      <button onClick={captureImage}>Capture Image</button>
    </div>
  );
}

export default CameraComponent;
