import favicon from "./components/img/unaab.jpeg";
import { Header, Button } from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import "./components/top.css";
import { teacherSubject } from "./components/testinput";
import Subjectimages from "./components";
import { CardComponent } from "./components";
import { useSelector } from "react-redux";
export const TeacherPortal = () => {
  const notifications = useSelector((state) => state.items.notifications);
  let allcategories = teacherSubject.map((item) => {
    return item.categoryName;
  });
  let uniquecategory = [...new Set(allcategories)];
  const rearrangement = {};
  for (const Category of uniquecategory) {
    let subject_in_category = teacherSubject
      .filter((detail) => detail.categoryName === Category)
      .map((item) => {
        let { name, year } = item;
        return { name, year };
      });
    rearrangement[Category] = subject_in_category;
  }
  console.log(rearrangement);
  return (
    <div
      className="container-fluid full-height-container"
      style={{ overflow: "hidden" }}
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
          <Button
            content={"Take Attendance"}
            class={"bg-dark"}
            iconclass={"fas fa-calendar-check"}
          />
          <Button
            content="Exam Prep"
            class={"bg-dark"}
            iconclass={"fas fa-calendar-check"}
          />
          <Button
            content="add E-book"
            class={"bg-dark"}
            iconclass={"fas fa-clipboard"}
          />
          <Button
            content={"Reset Password"}
            class={"bg-dark"}
            iconclass={"fas fa-unlock-alt"}
          />
          <Button
            content={"LogOut"}
            class={"bg-dark mt-auto"}
            iconclass={"fas fa-sign-out-alt"}
          />
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
            <div
              className="row"
              style={{ marginTop: "8rem", overflowY: "auto" }}
            >
              {uniquecategory.map((detail) => {
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <h4
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bolder",
                          }}
                        >
                          {" "}
                          {detail} category:
                        </h4>
                      </div>
                      {rearrangement[detail].map((item, index) => (
                        <div
                          key={index}
                          className="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
                        >
                          <CardComponent
                            imageSrc={Subjectimages[`${item["name"]}.jpg`]}
                            name={item["name"]}
                            year={item["year"]}
                            className="card-component"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
