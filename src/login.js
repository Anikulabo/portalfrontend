import React, { createContext, useState } from "react";
import axios from "axios";
import { updateentry } from "./action";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Textinput, Inputpassword, Forms, Top } from "./components";
import { automatic_obj_update, objectreducer } from "./components/dependencies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import exam5 from "./components/img/exam5.jpg";
import favicon from "./components/img/unaab.jpeg";
const Allcontext = createContext();
function Login() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = useSelector((state) => state.items.userdata);
  let error = useSelector((state) => state.items.error);
  const [type, setType] = useState({ type1: true });
  const [icon, setIcon] = useState({ icon1: false });
  const login = async () => {
    try {
      // Extract username and password from the data object
      let regno = data["username"];
      let password = data["password"];

      // Send a POST request with the credentials
      const response = await axios.post(
        `http://localhost:3001/user`,
        { regno, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Update the token
      dispatch(updateentry(response.data["token"], "token"));
      dispatch(updateentry(response.data.userdetail["role"], "role"));
      dispatch(updateentry(response.data.userdetail["userid"], "userid"));
      // Navigate based on the role
      switch (response.data.userdetail["role"]) {
        case 2: // Teacher's route
          navigate("/teacherportal", { replace: true });
          break;
        case 1: // Admin's route
          navigate("/admindashboard", { replace: true });
          break;
        case 3: // Student's route
          navigate("/studentportal", { replace: true });
          break;
        default:
          // Handle unexpected role values or default case
          console.warn("Unexpected role:", response.data.role);
          break;
      }

      // Cleanup any error after successful login
      dispatch(updateentry("", "error"));
    } catch (error) {
      console.error("error:", error);

      // Ensure error.response and error.response.data are defined before accessing
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      dispatch(updateentry(errorMessage, "error"));
    }
  };

  const addupdate = (event, type) => {
    let value = event.target.value;
    dispatch(updateentry(value, type));
  };
  const hideicon = (event, type) => {
    const control = event.target.value.length;
    if (control > 0) {
      let newicon = automatic_obj_update(icon, true, type);
      setIcon(newicon);
    } else {
      let newicon = automatic_obj_update(icon, false, type);
      setIcon(newicon);
    }
  };
  const changeType = (part) => {
    let newtype = automatic_obj_update(type, !type[part], part);
    setType(newtype);
  };
  const leftHalfStyle = {
    height: "100vh",
    backgroundImage: `url(${exam5})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const redHueStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  };
  return (
    <div className="container-fluid h-100" style={{ overflowY: "auto" }}>
      <div className="row h-100">
        <div
          className="col-md-6  align-items-stretch  d-none d-sm-block"
          style={leftHalfStyle}
        >
          <div style={redHueStyle}></div>
          <div className="bottom-div-container">
            <div className="bottom-div">
              <img
                className="round-image"
                src={favicon}
                alt="the school logo should show here"
                height={"40px"}
              />
              <h3>Welcome to FUNAAB portal</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 formholder d-flex align-items-stretch d-sm-none d-md-block position-relative h-100 min-vh-100">
          <Top content={"Log in"} />
          <Forms small={true} error={error}>
            <Textinput
              variable={"UserName"}
              data={data.username}
              placeholder={"enter your Username"}
              action={addupdate}
              ctrl={"username"}
            />
            <Inputpassword
              variable={"Password"}
              type={type["type1"]}
              placeholder={"type your password"}
              value={data.password}
              eyeicon={icon["icon1"]}
              ctrl={{ password: "password", icon: "icon1", type: "type1" }}
              action={{ addupdate, hideicon, changeType }}
            />
          </Forms>
          <button
            className="submit-button position-absolute bottom-0 start-50 translate-middle-x w-75 mb-3"
            onClick={() => {
              login();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export { Login, Allcontext };
