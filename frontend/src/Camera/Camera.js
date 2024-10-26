import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Camera.css";

function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCaptured, setIsCaptured] = useState(false);
    const [error, setError] = useState(null);
    const [imageFormat] = useState("image/png");
    const [imageDataUrl, setImageDataUrl] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const navigate = useNavigate();

    const startCamera = async (deviceId) => {
        try {
            const constraints = {
                video: {
                    deviceId: deviceId ? { exact: deviceId } : undefined,
                    facingMode: { ideal: "environment" },
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            setError("Error accessing the camera. Please check permissions.");
            console.error("Error accessing the camera", error);
        }
    };

    const getDevices = async () => {
        try {
            const mediaDevices =
                await navigator.mediaDevices.enumerateDevices();
            const videoDevices = mediaDevices.filter(
                (device) => device.kind === "videoinput"
            );
            setDevices(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedDeviceId(videoDevices[0].deviceId);
                startCamera(videoDevices[0].deviceId);
            }
        } catch (error) {
            console.error("Error fetching media devices:", error);
        }
    };

    useEffect(() => {
        getDevices();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const handleDeviceChange = (e) => {
        const deviceId = e.target.value;
        setSelectedDeviceId(deviceId);
        startCamera(deviceId);
    };

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
        context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
        setIsCaptured(false);
        setImageDataUrl(null);
        startCamera(selectedDeviceId);
    };

    const uploadImageAndNavigate = async () => {
        if (imageDataUrl) {
            const payload = {
                base64Image: imageDataUrl,
            };
            console.log(payload);

            try {
                const uploadResponse = await fetch(
                    "http://localhost:8000/api/images/upload",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );

                if (!uploadResponse.ok) {
                    throw new Error("Image upload failed");
                }

                navigate("/process");
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                retakeImage();
            }
        }
    };

    return (
        <div className="container">
            {error && <p className="error">{error}</p>}

            {/* Media Devices Dropdown */}
            <select
                onChange={handleDeviceChange}
                value={selectedDeviceId || ""}
                className="device-dropdown"
            >
                {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId}`}
                    </option>
                ))}
            </select>

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
                <button
                    onClick={() => navigate("/about")}
                    className="button save"
                >
                    About
                </button>
            )}
            {isCaptured ? (
                <>
                    <button onClick={retakeImage} className="button retake">
                        Retake Image
                    </button>
                    <button
                        onClick={uploadImageAndNavigate}
                        className="button save"
                    >
                        Process
                    </button>
                </>
            ) : (
                <button onClick={captureImage} className="button capture">
                    Capture Image
                </button>
            )}
        </div>
    );
}

export default Camera;
