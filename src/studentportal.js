import favicon from "./components/img/unaab.jpeg";
import "./components/top.css";
import {
  Button,
  Header,
  TeacherCard,
  Mainmodal,
  Inputpassword,
  renewToken,
} from "./components";
import { automatic_obj_update } from "./components/dependencies";
import { useEffect, useState, useRef } from "react";
import Subjectimages from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { subjects, studentsession } from "./components/testinput";
export const Student = () => {
  let [visible, setVisible] = useState(4);
  let [search, setSearch] = useState("");
  const [isStudentDivVisible, setIsStudentDivVisible] = useState(false);
  const toggleStudentDiv = () => {
    setIsStudentDivVisible(!isStudentDivVisible);
  };
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
  const [modaldisplay, setModaldisplay] = useState({
    changepassword: false,
    viewResult: false,
  });
  const [passwords, setPasswords] = useState({
    formerpassword: "",
    new_password: "",
    confirm_password: "",
  });
  const notifications = useSelector((state) => state.items.notifications);
  const userdata = useSelector((state) => state.items.userdata);
  const token = useSelector((state) => state.items.token);
  let [visiblesubject, setVisiblesubject] = useState(
    subjects.filter((detail) => detail.id <= visible && detail.id > visible - 4)
  );
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  useEffect(() => {
    setIcondisplay({
      ...icondisplay,
      next: visible < subjects.length,
      previous: visible > 4,
    });
    if (token !== null) {
      // Clear the previous interval if it exists
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up a new interval
      intervalRef.current = setInterval(
        () => renewToken(userdata, dispatch),
        60000
      ); // 1 minute
      // Clean up function to clear the interval when component unmounts or dependencies change
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [visible, subjects.length, dispatch, token, userdata]);
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
  const dynamicmargin = {
    marginTop: "9rem",
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
      <Mainmodal
        showModal={modaldisplay["viewResult"]}
        ctrl={"viewResult"}
        actions={{
          control: modalctrl,
          mainfunction: handleUpload,
        }}
        footer={{
          close: "close",
          mainfunction: "viewResult",
          modalcontrolled: "viewResult",
        }}
        title="View Results"
        bodyClass="custom-modal-body" // Add this line
      >
        <table>
          <thead>
            <tr>
              <th>Session Name</th>
              <th>Term</th>
              <th>Category Name</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentsession.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((key, index) => (
                  <td key={index}>{item[key]} </td>
                ))}
                <td>
                  <button className="btn btn-primary">View Result</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Mainmodal>
      <div className="row h-100">
        <div
          className={`col-md-2 h-100 bg-dark text-light student-div d-md-block ${
            isStudentDivVisible ? "col-sm-12" : "d-none"
          }`}
          style={isStudentDivVisible ? dynamicmargin : null}
        >
          <div className="inline-container">
            <img
              className="round-image"
              src={favicon}
              alt="the school logo should show here"
              height="40px"
            />
            <p>
              FUNAAB
              <small className="small-text d-none d-md-block">
                Federal University of Agriculture,Abeokuta
              </small>
              <small className="small-text d-md-none d-sm-block">
                Student portal
              </small>
            </p>
          </div>
          <Button
            content={"Make payment"}
            class={`bg-dark ${isStudentDivVisible ? "w-100" : ""}`}
            iconclass={"fas fa-credit-card"}
          />
          <Button
            content={"View Result"}
            class={`bg-dark ${isStudentDivVisible ? "w-100" : ""}`}
            action={modalctrl}
            modal={"viewResult"}
            iconclass={"fas fa-chart-bar"}
          />
          <Button
            content={"Reset Password"}
            class={`bg-dark ${isStudentDivVisible ? "w-100" : ""}`}
            action={modalctrl}
            modal={"changepassword"}
            iconclass={"fas fa-unlock-alt"}
          />
          <Button
            content={"LogOut"}
            class={`bg-dark mt-auto ${isStudentDivVisible ? "w-100" : ""}`}
            iconclass={"fas fa-sign-out-alt"}
          />
        </div>
        <div className="col-md-10 h-100 col-sm-12">
          <Header
            message={"Student portal"}
            imageSrc={avatar1}
            action={{ change: action, show: toggleStudentDiv }}
            searchvalue={search}
            itemctrl={isStudentDivVisible}
            notifications={notifications.filter(
              (detail) => detail.seen === false
            )}
          />
          <div className="container-fluid">
            <div className="row">
              <div
                style={{ marginTop: "5rem" }}
                className="col-6 d-none d-md-block"
              >
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
                          imageSrc={Subjectimages[`${subject["name"]}.jpg`]}
                          teacherName={subject["teacher"]}
                          subjectName={subject["name"]}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div
                className="col-sm-12 d-sm-block d-md-none"
                style={{ marginTop: "7rem" }}
              >
                <div>Subject teachers:</div>
                {search.length <= 0
                  ? subjects.map((item, index) => {
                      return (
                        <div key={index} className="user-container mt-3">
                          <img
                            className="teacher-image-small"
                            src={Subjectimages[`${item["name"]}.jpg`]}
                            alt={item["name"]}
                          />
                          <div>
                            <p className="user-name">{item["teacher"]}</p>
                            <p className="user-class">{item["name"]}</p>
                          </div>
                        </div>
                      );
                    })
                  : subjects
                      .filter(
                        (detail) =>
                          detail["name"].slice(0, search.length) === search
                      )
                      .map((item, index) => {
                        return (
                          <div key={index} className="user-container mt-3">
                            <img
                              className="teacher-image-small"
                              src={Subjectimages[`${item["name"]}.jpg`]}
                              alt={item["name"]}
                            />
                            <div>
                              <p className="user-name">{item["teacher"]}</p>
                              <p className="user-class">{item["name"]}</p>
                            </div>
                          </div>
                        );
                      })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
