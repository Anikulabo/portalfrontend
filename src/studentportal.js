import favicon from "./components/img/unaab.jpeg";
import "./components/top.css";
import {
  Button,
  Header,
  TeacherCard,
  Mainmodal,
  Inputpassword,
} from "./components";
import { automatic_obj_update } from "./components/dependencies";
import { useEffect, useState } from "react";
import images from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { useSelector } from "react-redux";
import { subjects } from "./components/testinput";
export const Student = () => {
  let [visible, setVisible] = useState(4);
  let [search, setSearch] = useState("");
  const [icondisplay, setIcondisplay] = useState({
    next: true,
    previous: false,
    formerpassword: false,
    new_password: false,
    confirm_password: false,
  });
  const [types, setTypes] = useState({
    formerpassword: true,
    new_password: true,
    confirm_password: true,
  });
  const [modaldisplay, setModaldisplay] = useState({ changepassword: false });
  const [passwords, setPasswords] = useState({
    formerpassword: "",
    new_password: "",
    confirm_password: "",
  });
  const notifications = useSelector((state) => state.items.notifications);
  let [visiblesubject, setVisiblesubject] = useState(
    subjects.filter((detail) => detail.id <= visible && detail.id > visible - 4)
  );
  useEffect(() => {
    if (visible === 4) {
      setIcondisplay({ ...icondisplay, next: true, previous: false });
    } else if (visible > 4 && visible < subjects.length) {
      setIcondisplay({ ...icondisplay, next: true, previous: true });
    }
    if (visible >= subjects.length) {
      setIcondisplay({ ...icondisplay, next: false, previous: true });
    }
    if (visible < 4) {
      setIcondisplay({ ...icondisplay, next: false, previous: false });
    }
  }, [visible]);
  const addupdate = (event, type) => {
    const value = event.target.value;
    let newpassword = automatic_obj_update(passwords, value, type);
    setPasswords(newpassword);
  };
  const hideicon = (event, type) => {
    let check = event.target.value.length;
    let newicons;
    if (check > 0) {
      newicons = automatic_obj_update(icondisplay, true, type);
    } else {
      newicons = automatic_obj_update(icondisplay, false, type);
    }
    setIcondisplay(newicons);
  };
  const changeType = (part) => {
    let newtypes = automatic_obj_update(types, !types[part], part);
    setTypes(newtypes);
  };
  const next = () => {
    if (visible + 4 < subjects.length) {
      setVisible((visible += 4));
      setVisiblesubject(
        subjects.filter(
          (detail) => detail.id <= visible && detail.id > visible - 4
        )
      );
    } else {
      let leftover = subjects.length % 4;
      setVisible(subjects.length);
      setVisiblesubject(
        subjects.filter(
          (detail) =>
            detail.id <= subjects.length &&
            detail.id > subjects.length - leftover
        )
      );
    }
  };
  const modalctrl = (ctrl, action) => {
    let newmodaldisplay;
    if (action === "close") {
      newmodaldisplay = automatic_obj_update(modaldisplay, false, ctrl);
    } else {
      newmodaldisplay = automatic_obj_update(modaldisplay, true, ctrl);
    }
    setModaldisplay(newmodaldisplay);
  };
  const previous = () => {
    const leftover = visible % 4;
    if (leftover > 0) {
      setVisible((visible -= leftover));
    } else {
      setVisible((visible -= 4));
    }
    setVisiblesubject(
      subjects.filter(
        (detail) => detail.id <= visible && detail.id > visible - 4
      )
    );
  };
  let handleUpload = () => {
    alert("this is the modal for changing password");
  };
  const action = (event) => {
    let value = event.target.value;
    if (value === "") {
      setVisible(4);
      setVisiblesubject(
        subjects.filter((detail) => detail.id <= 4 && detail.id > 0)
      );
    } else {
      let searchresult = subjects.filter(
        (detail) => detail["name"].slice(0, value.length) === value
      );
      setVisiblesubject(searchresult);
      setVisible(0);
    }
    setSearch(value);
  };
  return (
    <div
      className="container-fluid full-height-container"
      style={{ overflow: "disable" }}
    >
      <Mainmodal
        showModal={modaldisplay["changepassword"]}
        ctrl={"changepassword"}
        actions={{
          control: modalctrl,
          mainfunction: handleUpload,
        }}
        footer={{
          close: "close",
          mainfunction: "changepassword",
          modalcontrolled: "changepassword",
        }}
        title="Change password"
      >
        <Inputpassword
          variable={"Former password"}
          type={types["formerpassword"]}
          placeholder={"type your previous password"}
          value={passwords["formerpassword"]}
          eyeicon={icondisplay["formerpassword"]}
          action={{ addupdate, hideicon, changeType }}
          ctrl={{
            password: "formerpassword",
            icon: "formerpassword",
            type: "formerpassword",
          }}
        />
        <Inputpassword
          variable={"new password"}
          type={types["new_password"]}
          placeholder={"type your new password"}
          value={passwords["new_password"]}
          eyeicon={icondisplay["new_password"]}
          action={{ addupdate, hideicon, changeType }}
          ctrl={{
            password: "new_password",
            icon: "new_password",
            type: "new_password",
          }}
        />
        <Inputpassword
          variable={"confirm password"}
          type={types["confirm_password"]}
          placeholder={"re-type your new password"}
          value={passwords["confirm_password"]}
          eyeicon={icondisplay["confirm_password"]}
          action={{ addupdate, hideicon, changeType }}
          ctrl={{
            password: "confirm_password",
            icon: "confirm_password",
            type: "confirm_password",
          }}
        />
      </Mainmodal>
      <div className="row h-100">
        <div className="col-2 h-100 bg-dark text-light student-div">
          <div className="inline-container">
            <img
              className="round-image"
              src={favicon}
              alt="the school logo should show here"
              height="40px"
            />
            <p>
              FUNAAB
              <small className="small-text">
                Federal University of Agriculture,Abeokuta
              </small>
            </p>
          </div>
          <Button content={"Make payment"} class={"bg-dark"} />
          <Button content={"View Result"} class={"bg-dark"} />
          <Button
            content={"Reset Password"}
            class={"bg-dark"}
            action={modalctrl}
            modal={"changepassword"}
          />
          <Button content={"LogOut"} class={"bg-dark mt-auto"} />
        </div>
        <div className="col-10 h-100">
          <Header
            message={"Student portal"}
            imageSrc={avatar1}
            action={action}
            searchvalue={search}
            notifications={notifications.filter(
              (detail) => detail.seen === false
            )}
          />
          <div className="container-fluid">
            <div className="row">
              <div style={{ marginTop: "5rem" }} className="col-6">
                <div>Subject teachers:</div>
                <br />
                <div className="teacher-card-container">
                  <i
                    className="fas fa-arrow-left top-left-btn"
                    onClick={() => previous()}
                    style={{ display: icondisplay.previous ? "block" : "none" }}
                  />
                  <i
                    className="fas fa-arrow-right top-right-btn"
                    onClick={() => next()}
                    style={{ display: icondisplay.next ? "block" : "none" }}
                  />
                  {visiblesubject.map((subject, index) => {
                    return (
                      <span key={index}>
                        <TeacherCard
                          imageSrc={images[`${subject["name"]}.jpg`]}
                          teacherName={subject["teacher"]}
                          subjectName={subject["name"]}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
