import favicon from "./components/img/unaab.jpeg";
import "./components/top.css";
import { Button, Header, TeacherCard } from "./components";
import { useEffect, useState } from "react";
import images from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { useSelector } from "react-redux";
const subjects = [
  { id: 1, name: "physics", teacher: "Mr.Lawal" },
  { id: 2, name: "chemistry", teacher: "Mrs.Ajibola" },
  { id: 3, name: "food&nut", teacher: "Miss.Dorcas" },
  { id: 4, name: "computer", teacher: "Mr.Dele" },
  { id: 5, name: "biology", teacher: "Mrs.Oluwole" },
  { id: 6, name: "agric", teacher: "Mr.Azeez" },
  { id: 7, name: "mathematics", teacher: "Mr.Adewale" },
  { id: 8, name: "phe", teacher: "Miss.Nike" },
  { id: 9, name: "history", teacher: "Miss.Esther" },
  { id: 10, name: "basic_electronics", teacher: "Mr.Ogunniran" },
  { id: 11, name: "Economics", teacher: "Mr.Fakuti" },
];
export const Student = () => {
  let [visible, setVisible] = useState(4);
  let [search, setSearch] = useState("");
  const [icondisplay, setIcondisplay] = useState({
    next: true,
    previous: false,
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
          (detail) => detail.id <= subjects.length && detail.id > subjects.length - leftover
        )
      )
    }
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
          <Button content={"Reset Password"} class={"bg-dark"} />
          <Button content={"LogOut"} class={"bg-dark mt-auto"} />
        </div>
        <div className="col-10 h-100">
          <Header
            message={"Student portal"}
            imageSrc={avatar1}
            action={action}
            searchvalue={search}
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
