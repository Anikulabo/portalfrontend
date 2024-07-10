import React, { createContext, useState, useEffect } from "react";
import { updateentry } from "./action";
import { useSelector, useDispatch } from "react-redux";
import { Inputpassword,Forms } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import exam4 from "./components/img/exam4.jpg";
import exam5 from "./components/img/exam5.jpg";
import exam6 from "./components/img/exam6.jpg";
import exam7 from "./components/img/exam7.jpg";
const Allcontext = createContext();
function Login() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  let password = useSelector((state) => state.items.userdata.password);
 let error=useSelector((state)=>state.items.error)
  const [type, setType] = useState(true);
  const [icon, setIcon] = useState(false);
  const [index, setIndex] = useState(0);
  const addpassword = (event) => {
    let value = event.target.value;
    dispatch(updateentry(value, "password"));
  };
  const hideicon = (event) => {
    const control = event.target.value.length;
    if (control > 0) {
      setIcon(true);
    } else {
      setIcon(false);
    }
  };
  const changeType = () => {
    setType(!type);
  };
  const images = [exam4, exam5, exam6, exam7];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);
  const leftHalfStyle = {
    height: "100vh",
    backgroundImage: `url(${images[index]})`,
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
          {/* Content for the left half */}
        </div>
        <div className="col-md-6 formholder d-flex align-items-stretch d-sm-none d-md-block">
            <Forms small={false} error={error}>
            <Allcontext.Provider value={{ addpassword, hideicon, changeType }}>
              <Inputpassword
                variable={"Password"}
                type={type}
                placeholder={"type your password"}
                //value={password}
                eyeicon={icon}
              />
            </Allcontext.Provider>
            </Forms>
        </div>
        <div
          className="col-sm-12 d-md-none d-sm-block d-flex align-items-stretch"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.5)", height: "100vh" }}
        ></div>
      </div>
    </div>
  );
}
export  {Login,Allcontext};
