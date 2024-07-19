import React, { createContext, useState } from "react";
import { updateentry } from "./action";
import { useSelector, useDispatch } from "react-redux";
import { Textinput, Inputpassword, Forms, Top } from "./components";
import { automatic_obj_update } from "./components/dependencies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import exam5 from "./components/img/exam5.jpg";
import favicon from "./components/img/unaab.jpeg";
const Allcontext = createContext();
function Login() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  let data = useSelector((state) => state.items.userdata);
  let error = useSelector((state) => state.items.error);
  const [type, setType] = useState({ type1: true });
  const [icon, setIcon] = useState({ icon1: false });
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
      let newicon = automatic_obj_update(icon, true, type);
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
          className="col-md-6 d-flex align-items-stretch d-sm-none d-md-block"
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
        <div className="col-md-6 formholder d-flex align-items-stretch d-sm-none d-md-block">
          <Top content={"Log in"} />
          <Forms small={false} error={error}>
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
            className="submit-button"
            onClick={() => {
              alert(data.username);
            }}
          >
            Login
          </button>
        </div>
        <div
          className="col-sm-12 d-md-none d-sm-block d-flex align-items-stretch"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.5)", height: "100vh" }}
        ></div>
      </div>
    </div>
  );
}
export { Login, Allcontext };
