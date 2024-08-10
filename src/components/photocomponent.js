import React, { useRef, useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import "./top.css"; // Import the CSS file for custom styling
import { Mainmodal } from "./allmodal"; // Import Mainmodal component
import { updateentry } from "../action";
const UploadButton = ({ onFileUpload }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dispatch=useDispatch();
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const fileInputRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const photoData=useSelector((state)=>state.items.image);

  // UseEffect to check refs and state on render
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
      console.log(imageData)
     dispatch(updateentry(imageData,"image")) // Pass the image data to parent component
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
    event.preventDefault(); // Prevent default form submission or link behavior
    if (!cameraStarted) {
      startCamera();
    } else {
      capturePhoto();
      stopCamera();
      setShowCamera(false); // Hide the camera component
    }
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
  
    const file = event.target.files[0];
  
    // Validate file type
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg','image/PNG'];
      if (!validTypes.includes(file.type)) {
        alert("Please select a JPG or JPEG file.");
        return;
      }
  
      // Read file data and set to photoData
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateentry(reader.result,"image")); // Set photoData to the file data URL
      };
      reader.readAsDataURL(file);
  
      // Optionally, call onFileUpload if you need to handle file upload elsewhere
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
    setShowCamera(true); // Show the camera capture component
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
            Upload File
          </button>
          <button
            className="btn btn-secondary upload-option"
            type="button" // Prevent default form submission
            onClick={handleTakePicture}
          >
            Take Picture
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

      {/* Bootstrap Modal */}
      <Mainmodal
        showModal={showCamera}
        title={"Take a Photo"}
        actions={{ control: closeModal, mainfunction: handleTakePhotoClick }}
        footer={{ close: "stop capture", mainfunction: "capture" }}
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
          style={{ marginLeft:"15px", marginTop: "10px", width: "250px", height: "200px" }}
        />
      )}
    </div>
  );
};

export default UploadButton;
