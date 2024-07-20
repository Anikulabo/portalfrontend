import favicon from "./components/img/unaab.jpeg";
import { Header, Button } from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import "./components/top.css";
import { useSelector } from "react-redux";
export const TeacherPortal = () => {
  const notifications = useSelector((state) => state.items.notifications);
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
          <Button content={"add result"} class={"bg-dark"} />
          <Button content={"Take Attendance"} class={"bg-dark"} />
          <Button content="Exam Prep" class={"bg-dark"} />
          <Button content="add E-book" class={"bg-dark"} />
          <Button content={"View Result"} class={"bg-dark"} />
          <Button content={"Reset Password"} class={"bg-dark"}/>
          <Button content={"LogOut"} class={"bg-dark mt-auto"} />
        </div>
        <div className="col-10 h-100">
          <Header
            message={"Teacher portal"}
            imageSrc={avatar1}
            notifications={notifications.filter(
              (detail) => detail.seen === false
            )}
          />
          <div className="container-fluid">
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
