import React, { useRef, useState } from "react";
import "./top.css"
const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);

  const startCamera = async () => {
    try {
      console.log("Attempting to access camera...");
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(userStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        videoRef.current.play();
      }
      setCameraStarted(true);
      console.log("Camera access granted.");
    } catch (error) {
      console.error("Error accessing the camera:", error);
      setError("Unable to access the camera. Please check your permissions.");
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/jpeg");
      onCapture(imageData); // Pass the image data to parent component
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleTakePhotoClick = (event) => {
    event.preventDefault(); // Prevent default form submission or link behavior
    if (!cameraStarted) {
      startCamera();
    } else {
      capturePhoto();
      stopCamera()
    }
  };

  return (
    <div className="video-container">
      {error && <p className="text-danger">{error}</p>}
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "auto",
          display: cameraStarted ? "block" : "none",
        }}
      ></video>
      <button
        onClick={(event) => handleTakePhotoClick(event)}
        className="btn btn-primary mt-2"
        type="button" // Ensure button type is "button"
      >
        {cameraStarted ? "Capture Photo" : "Start Camera"}
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default CameraCapture;
