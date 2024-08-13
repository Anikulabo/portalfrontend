import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./top.css";
import { Mainmodal } from "./allmodal";
import { updateentry } from "../action";

const UploadButton = ({ onFileUpload }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const fileInputRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const photoData = useSelector((state) => state.items.image);

  useEffect(() => {
    console.log('videoRef:', videoRef.current);
    console.log('canvasRef:', canvasRef.current);
  }, []);

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/jpeg");
      console.log(imageData);
      dispatch(updateentry(imageData, "image"));
    } else {
      console.error("Canvas or Video ref is null");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const closeModal = () => {
    stopCamera();
    setShowCamera(false);
  };

  const handleTakePhotoClick = (event) => {
    event.preventDefault();
    if (!cameraStarted) {
      startCamera();
    } else {
      capturePhoto();
      stopCamera();
      setShowCamera(false);
    }
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/PNG'];
      if (!validTypes.includes(file.type)) {
        alert("Please select a JPG or JPEG file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateentry(reader.result, "image"));
      };
      reader.readAsDataURL(file);

      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

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

  const handleClickUpload = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleTakePicture = (event) => {
    event.preventDefault();
    setShowCamera(true);
    startCamera();
  };

  return (
    <div>
      <div className="upload-button-container" style={{ marginTop: "5rem" }}>
        <button
          className="upload-button"
          type="button" // Prevent default form submission
          onClick={handleClickUpload}
        >
          Upload
        </button>
        <div className="upload-options">
          <button
            className="btn btn-secondary upload-option"
            type="button" // Prevent default form submission
            onClick={handleClickUpload}
          >
            <i className="fas fa-upload"></i> Upload File
          </button>
          <button
            className="btn btn-secondary upload-option"
            type="button" // Prevent default form submission
            onClick={handleTakePicture}
          >
            <i className="fas fa-camera ml-3"></i> Take Picture
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      <Mainmodal
        showModal={showCamera}
        title={"Take a Photo"}
        actions={{ control: closeModal, mainfunction: handleTakePhotoClick }}
        footer={{ close: "Stop Capture", mainfunction: "Capture" }}
      >
        {error && <p className="text-danger">{error}</p>}
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "auto",
            display: cameraStarted ? "block" : "none",
          }}
          autoPlay
        ></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </Mainmodal>
      {photoData && (
        <img
          src={photoData}
          alt="Captured"
          style={{ marginLeft: "15px", marginTop: "10px", width: "250px", height: "200px" }}
        />
      )}
    </div>
  );
};

export default UploadButton;
