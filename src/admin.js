import { Header, Sidebar, renewToken } from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { Mainmodal } from "./components";
import { automatic_obj_update } from "./components/dependencies";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect, useRef } from "react";
import { Usersimages, ProfileTable, Personal } from "./components";
import {
  all_teachers,
  all_students,
  mockData,
  classes,
  sessions,
  categories,
  departments,
  subjects,
  Teacher_mock_data,
} from "./components/testinput";
import axios from "axios";
import "./components/top.css";
const allActions = [
  "Teacher's Detail",
  "Student's Detail",
  "viewClasses",
  "viewSession",
  "viewCategory",
  "viewSubjects",
  "viewDepartment",
];
const Admin = () => {
  const [activeButton, setActiveButton] = useState("Teacher's Detail");
  const [activeprofile, setActiveprofile] = useState(1);
  let [teachers, setTeachers] = useState(all_teachers);
  const [fulldetail, setFulldetail] = useState({
    tabledata: teachers,
  });
  const get_all_detail = {
    "Student's Detail": mockData,
    "Teacher's Detail": Teacher_mock_data,
  };
  const [markedentry, setMarkedentry] = useState(() => {
    let markedentry = {};
    for (const action of allActions) {
      if (action !== "viewSubjects") {
        markedentry[action] = [];
      } else {
        markedentry[action] = 0;
      }
    }
    return markedentry;
  });
  const token = useSelector((state) => state.items.token);
  const userdata = useSelector((state) => state.items.userdata);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
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
  }, [token, intervalRef, userdata, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      let id = 0;
      let searchRole = 2;
      try {
        const teachers = await axios.get(
          `http://localhost:3001/user/${id}/${searchRole}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Include the token if needed
          }
        );
        const student = await axios.get(`http://localhost:3001/user/${id}/3`, {
          headers: { Authorization: `Bearer ${token}` }, // Include the token if needed
        });
        if (teachers.status === 200) {
          console.log("it's okay");
          setTeachers(teachers.data.detail);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const detail = useMemo(() => {
    let detail = {};
    if (get_all_detail[activeButton]) {
      detail = get_all_detail[activeButton].find(
        (item) => item.id === activeprofile
      );
    } else {
      detail = {
        first_name: "kelvin",
        last_name: "Smith",
        categoryName: "Arts",
        department: "Literature",
        year: 2023,
        sex: "Female",
        DOB: "1999-05-22",
        email: "jane.smith@example.com",
        address: "456 Elm St, Othertown, USA",
        class: "11B",
        session: "Fall 2023",
      };
    }
    return detail;
  }, [activeprofile, activeButton, get_all_detail]);
  const [allmodals, setAllmodals] = useState({
    updateStudent: false,
    viewClasses: false,
    viewSession: false,
    viewCategory: false,
    viewSubjects: false,
  });
  const handleButtonClick = (sectionName, value) => {
    setActiveButton(sectionName);
    console.log(markedentry);
    switch (sectionName) {
      case "Teacher's Detail":
        setFulldetail({ ...fulldetail, tabledata: all_teachers });
        setActiveprofile(1);
        break;
      case "Student's Detail":
        setFulldetail({ ...fulldetail, tabledata: all_students });
        setActiveprofile(1);
        break;
      case "viewClasses":
        setFulldetail({ ...fulldetail, tabledata: classes });
        setActiveprofile(1);
        break;
      case "viewSession":
        setFulldetail({ ...fulldetail, tabledata: sessions });
        setActiveprofile(1);
        break;
      case "viewCategory":
        setFulldetail({ ...fulldetail, tabledata: categories });
        setActiveprofile(1);
        break;
      case "viewDepartment":
        let reduceddepartments = departments.map((item) => {
          return { id: item.id, department: item.name };
        });
        setFulldetail({ ...fulldetail, tabledata: reduceddepartments });
        setActiveprofile(1);
        break;
      case "viewSubjects":
        let reducedsubject = subjects.map((item) => {
          return { id: item.id, name: item.name };
        });
        setFulldetail({ ...fulldetail, tabledata: reducedsubject });
        setActiveprofile(1);
        break;
      default:
        console.log("no default condition is giving yet");
    }
  };
  const modalupdate = (modal, action) => {
    let newmodals;
    if (action === "open") {
      newmodals = automatic_obj_update(allmodals, true, modal);
    } else {
      newmodals = automatic_obj_update(allmodals, false, modal);
    }
    setAllmodals(newmodals);
  };
  // const modalopen=(modal)=>{
  //   switch(modal){
  //     case ""
  //   }
  // }
  const addentry = (value) => {
    // allowing multiple addition of entry
    if (Array.isArray(markedentry[activeButton])) {
      //add a new entry to the lidt of entry
      if (!markedentry[activeButton].includes(value)) {
        let newmarkedentry = automatic_obj_update(
          markedentry,
          value,
          activeButton
        );
        setMarkedentry(newmarkedentry);
      } else {
        // If it is, remove the value from the list associated with activeButton
        let newmarkedentry = {
          ...markedentry,
          [activeButton]: markedentry[activeButton].filter(
            (item) => item !== value
          ),
        };
        setMarkedentry(newmarkedentry);
      }
    } else {
      // for accepting only single update
      let newmarkedentry = automatic_obj_update(
        markedentry,
        value,
        activeButton
      );
      setMarkedentry(newmarkedentry);
    }
  };
  return (
    <div className="App">
      <div className="container-fluid">
        <Mainmodal
          showmodal={allmodals["updateStudent"]}
          actions={{ control: modalupdate }}
          title="Student Update"
          ctrl="updateStudent"
          footer={{
            close: "close",
            mainfunction: "updateStudents",
            modalcontrolled: "changepassword",
          }}
        >
          <input type="text" />
        </Mainmodal>
        <div className="row">
          <Sidebar
            items={allActions}
            active={activeButton}
            value={true}
            handleButtonClick={handleButtonClick}
          />
          <div className="col-md-10 content">
            <Header
              message={"Admin's Dashboard"}
              imageSrc={avatar1}
              notifications={""}
            />{" "}
            <div className="row">
              <ProfileTable
                tabledata={fulldetail["tabledata"]}
                Usersimages={
                  allActions.indexOf(activeButton) < 2 ? Usersimages : undefined
                }
                activeprofile={activeprofile}
                topic={(() => {
                  let topic;
                  switch (activeButton) {
                    case "Teacher's Detail":
                      topic = "Teachers";
                      break;
                    case "Student's Detail":
                      topic = "Students";
                      break;
                    default:
                      topic = activeButton.slice(4, activeButton.length);
                  }
                  return topic;
                })()}
                markedentries={markedentry[activeButton]}
                addmarkedentry={addentry}
                setActiveprofile={setActiveprofile}
              />
              <Personal
                testData={detail}
                imageSrc={(() => {
                  if (activeButton === "Student's Detail") {
                    return Usersimages[`${detail["first_name"]}.jpg`];
                  } else if (activeButton === "Teacher's Detail") {
                    return Usersimages[
                      `${detail["teacherDetail"]["fname"]}.jpg`
                    ];
                  } else {
                    return undefined;
                  }
                })()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
