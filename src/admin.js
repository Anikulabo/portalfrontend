import { Sidebar } from "./components";
import { Header } from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { automatic_obj_update, objectreducer } from "./components/dependencies";
import { useState, useMemo } from "react";
import { Usersimages, ProfileTable, Personal } from "./components";
import { all_teachers, all_students, mockData } from "./components/testinput";
import "./components/top.css";
const allActions = [
  "Teacher's Detail",
  "Student's Detail",
  "viewClasses",
  "viewSeesion",
  "viewCategory",
  "viewSubjects",
];
const Admin = () => {
  const [activeButton, setActiveButton] = useState("Teacher's Detail");
  const [activeprofile, setActiveprofile] = useState(1);
  const [fulldetail, setFulldetail] = useState({
    tabledata: all_teachers,
  });
  const get_all_detail = { "Student's Detail": mockData };
  const [markedentry, setMarkedentry] = useState(() => {
    let markedentry = {};
    for (const action of allActions) {
      markedentry[action] = [];
    }
    return markedentry;
  });
  const detail = useMemo(() => {
    let detail={}
    if(get_all_detail[activeButton]){
       detail=get_all_detail[activeButton].find((item)=>item.id===activeprofile)
    }else{
      detail= {
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
        session: "Fall 2023"
      }
    }
    return detail
  }, [activeprofile,activeButton,get_all_detail]);
  const [allmodals, setAllmodals] = useState({
    viewClasses: false,
    viewSession: false,
    viewCategory: false,
    viewSubjects: false,
  });
  const handleButtonClick = (sectionName, value) => {
    setActiveButton(sectionName);
    console.log(activeprofile);
    switch (sectionName) {
      case "Teacher's Detail":
        setFulldetail({ ...fulldetail, tabledata: all_teachers });
        setActiveprofile(1);
        break;
      case "Student's Detail":
        setFulldetail({ ...fulldetail, tabledata: all_students });
        setActiveprofile(1);
        break;
      default:
        if (allActions.indexOf(sectionName) >= 2 && value) {
          let newmodal = automatic_obj_update(allmodals, value, sectionName);
          setAllmodals(newmodal);
        }
        console.log(allmodals);
    }
  };
  const addentry = (value) => {
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
  };
  return (
    <div className="App">
      <div className="container-fluid">
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
                Usersimages={Usersimages}
                activeprofile={activeprofile}
                topic={activeButton === allActions[0] ? "Teachers" : "Students"}
                markedentries={markedentry[activeButton]}
                addmarkedentry={addentry}
                setActiveprofile={setActiveprofile}
              />
              <Personal
                testData={detail}
                imageSrc={Usersimages[`${detail['first_name']}.jpg`]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
