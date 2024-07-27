import { Sidebar } from "./components";
import { Header } from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { useState } from "react";
import { Usersimages } from "./components";
import { all_teachers, all_students } from "./components/testinput";
import "./components/top.css";
const Admin = () => {
  const [activeButton, setActiveButton] = useState("Teacher's Detail");
  const [tabledata, setTabledata] = useState(all_teachers);
  const [activeprofile, setActiveprofile] = useState(0);
  const handleButtonClick = (sectionName) => {
    setActiveButton(sectionName);
    switch (sectionName) {
      case "Teacher's Detail":
        setTabledata(all_teachers);
        setActiveprofile(0);
        break;
      case "Student's Detail":
        setTabledata(all_students);
        setActiveprofile(0);
    }
  };
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <div className="container-fluid">
        <div className="row">
          <Sidebar
            items={[
              "Teacher's Detail",
              "Student's Detail",
              "Add new class",
              "add new seesion",
              "add new category",
              "add new subject",
            ]}
            active={activeButton}
            handleButtonClick={handleButtonClick}
          />
          <div className="col-md-10 content">
            <Header
              message={"Admin's Dashboard"}
              imageSrc={avatar1}
              notifications={""}
            />{" "}
            <div
              class="table-container col-4"
              style={{ marginTop: "7rem", maxHeight: "50%", overflowY: "auto" }}
            >
              <table class="table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    {Object.keys(tabledata[0]).map((item) => {
                      return <th>{item}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {tabledata.map((item, index) => {
                    return (
                      <tr
                      style={{cursor:"pointer"}}
                        key={index}
                        onClick={() => {
                          setActiveprofile(index);
                        }}
                      >
                        <td
                          className={
                            index === activeprofile
                              ? "bg-primary text-light"
                              : ""
                          }
                        >
                          <img
                            src={
                              Object.keys(item).includes("fname")
                                ? Usersimages[`${item["fname"]}.jpg`]
                                : Usersimages[`${item["first_name"]}.jpg`]
                            }
                            alt="Profile"
                            className="header-image"
                          />
                        </td>
                        {Object.keys(item).map((detail, childindex) => {
                          return (
                            <td
                              key={childindex}
                              className={
                                index === activeprofile
                                  ? "bg-primary text-light"
                                  : ""
                              }
                            >{`${item[detail]}`}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
