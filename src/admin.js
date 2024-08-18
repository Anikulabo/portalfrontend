import Subjectimages, {
  Header,
  Sidebar,
  Usersimages,
  ProfileTable,
  Personal,
  Textinput,
  CheckboxDropdown,
  Dropdown2,
  NestedDropdown,
} from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { Mainmodal } from "./components";
import {
  automatic_obj_update,
  objectreducerontypes,
  objectsearch,
  objectreducer,
  onselected,
} from "./components/dependencies";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect, useCallback } from "react";
import { updateentry } from "./action";
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
  classes_mock_data,
  SessionMockData,
  category_mockdata,
  Subjects_mock,
} from "./components/testinput";
import axios from "axios";
import "./components/top.css";
const allActions = [
  "Teacher's Detail",
  "Student's Detail",
  "viewClasses",
  "viewSessions",
  "viewCategories",
  "viewSubjects",
  "viewDepartments",
];
const ALLVISIBLEPART = {
  "Teacher's Detail": ["id", "fname", "lname", "staff_id"],
  "Student's Detail": ["id", "first_name", "last_name", "regNo"],
  viewClasses: ["id", "name"],
  viewSessions: ["id", "sessionName"],
  viewCategories: ["id", "categoryName", "years"],
  viewSubjects: ["id", "name"],
  viewDepartments: ["id", "name"],
};
const ALLREQBODIES = {
  "Teacher's Detail": [
    "fname",
    "lname",
    "email",
    "phoneNo",
    "address",
    "category_id",
    "department_id",
  ],
  "Student's Detail": [
    "first_name",
    "last_name",
    "category_id",
    "department_id",
    "year",
    "sex",
    "DOB",
    "email",
    "address",
  ],
  viewClasses: ["year", "category_id", "department_id", "name", "teacherid"],
  viewSessions: ["sessionName", "term"],
  viewCategories: ["categoryName", "years"],
  viewSubjects: ["name", "categories", "departments", "teachers", "compulsory"],
  viewDepartments: ["category_id", "name"],
};
const Admin = () => {
  const dispatch = useDispatch();
  let selected = useSelector((state) => state.items.selected);
  const [activeButton, setActiveButton] = useState("Teacher's Detail");
  const [activeprofile, setActiveprofile] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  let [teachers, setTeachers] = useState(all_teachers);
  const [fulldetail, setFulldetail] = useState({
    tabledata: teachers.map((item) => {
      const { newobject } = objectreducer(
        item,
        ALLVISIBLEPART["Teacher's Detail"]
      );
      return newobject;
    }),
  });
  let teachersdetail = useSelector((state) => state.items.teacherDetail);
  let studentdetails = useSelector((state) => state.items.studentdetail);
  let common = useSelector((state) => state.items.common);
  let [alldata, setAlldata] = useState({
    name: "",
    categoryName: "",
    sessionName: "",
    ...teachersdetail,
    ...studentdetails,
    ...common,
    categories: [],
    departments: {},
    teachers: {},
    compulsory: [],
    years: null,
    term: "",
  });
  const icons = useSelector((state) => state.items.allsubjecticons);
  const navigate = useNavigate();
  const deptoptions = useMemo(() => {
    if (alldata["category_id"] !== null) {
      const results = departments
        .filter((item) => item.category_id === alldata["category_id"])
        .map((detail) => {
          return { name: detail.name };
        });
      return results.length > 0 ? results : [];
    } else {
      return [];
    }
  }, [alldata["category_id"], departments]);
  const nesteddeptoptions = useMemo(() => {
    let options = {};
    if (alldata["categories"].length > 0) {
      alldata["categories"].forEach((item) => {
        const categoryName = categories.find(
          (detail) => detail.id === Number(item)
        )?.["categoryName"];
        const dept_under_categories = departments.filter(
          (content) => content.category_id === Number(item)
        );
        options[categoryName] =
          dept_under_categories.length > 0 ? dept_under_categories : ["all"];
      });
    }
    return options;
  }, [alldata["categories"], departments, categories]);
  const yearsoption = useMemo(() => {
    if (alldata["category_id"] !== null) {
      const category = categories.find(
        (item) => item.id === alldata["category_id"]
      );
      if (category) {
        const max_year = category["years"];
        return Array.from({ length: max_year }, (_, i) => i + 1); // Generating years from 1 to max_year
      }
    }
    return [];
  }, [alldata["category_id"], categories]);
  const get_all_detail = {
    "Student's Detail": mockData,
    "Teacher's Detail": Teacher_mock_data,
    viewClasses: classes_mock_data,
    viewSessions: SessionMockData,
    viewCategories: category_mockdata,
    viewSubjects: Subjects_mock,
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
  const selecteddept = useCallback(
    (event, dept) => {
      let newdept = {};
      if (Object.keys(nesteddeptoptions).length > 0) {
        Object.keys(nesteddeptoptions).forEach(
          (item) => (newdept[item] = null)
        );        
      }
      if(dept){
        newdept[dept]=Number(event.target.value)
      }
      setAlldata({ ...alldata, departments: newdept })
    console.log(newdept)
    },
    [nesteddeptoptions]
  );
  let [allmodals, setAllmodals] = useState(false);
  const updateselected = (arg) => {
    let allkeys = Object.keys(arg);
    try {
      let currentselection;
      if (allkeys.includes("mainobject", "visiblepart")) {
        const { event, mainobject, visiblepart } = arg;
        currentselection = onselected(event, mainobject, visiblepart);
      } else {
        currentselection = {
          id: arg["event"].target.getAttribute("id"),
          res: arg["event"].target.innerText,
        };
      }
      dispatch(updateentry(currentselection["res"], arg["type"]));
      if (arg["type"] === "category" || arg["type"] === "department") {
        const newalldata = automatic_obj_update(
          alldata,
          Number(currentselection["id"]),
          `${arg["type"]}_id`
        );
        setAlldata(newalldata);
      } else {
        const newalldata = automatic_obj_update(
          alldata,
          Number(currentselection["id"]),
          `${arg["type"]}`
        );
        setAlldata(newalldata);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  const updateselecteditems = (event) => {
    const value = event.target.value;
    setSelectedItems((prevSelectedItems) => {
      // Check if the value is already selected
      const isSelected = prevSelectedItems.includes(value);
      if (isSelected) {
        // Remove the item from the selection
        return prevSelectedItems.filter((item) => item !== value);
      } else {
        // Add the item to the selection
        return [...prevSelectedItems, value];
      }
    });
  };
  const adddata = () => {
    switch (activeButton) {
      case "Teacher's Detail":
        navigate("/teacheregistration", { replace: false });
        break;
      default:
        setAllmodals(true);
        console.log(allmodals);
    }
  };
  const updatedata = (event, part) => {
    let value = event.target.value || event.target.innerText;
    let newdatas = automatic_obj_update(alldata, value, part);
    setAlldata(newdatas);
    console.log(newdatas);
  };
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
    let computedDetail = {};

    if (get_all_detail[activeButton]) {
      if (activeButton !== "viewSubjects") {
        computedDetail = get_all_detail[activeButton].find(
          (item) => item.id === activeprofile
        );
      } else {
        const subjectDetail = subjects.find(
          (item) => item.id === activeprofile
        );
        if (subjectDetail) {
          computedDetail = get_all_detail[activeButton].find(
            (item) =>
              item.name.toLowerCase() === subjectDetail.name.toLowerCase()
          );
        }
      }
    }

    if (!computedDetail) {
      computedDetail = {
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

    return computedDetail;
  }, [activeprofile, activeButton, get_all_detail]);
  const handleButtonClick = (sectionName, value) => {
    setActiveButton(sectionName);
    console.log(icons);
    switch (sectionName) {
      case "Teacher's Detail":
        all_teachers = all_teachers.map((item) => {
          const { newobject } = objectreducer(
            item,
            ALLVISIBLEPART["Teacher's Detail"]
          );
          return newobject;
        });
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
      case "viewSessions":
        setFulldetail({ ...fulldetail, tabledata: sessions });
        setActiveprofile(1);
        break;
      case "viewCategories":
        setFulldetail({ ...fulldetail, tabledata: categories });
        setActiveprofile(1);
        break;
      case "viewDepartments":
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
  const modalupdate = () => {
    setAllmodals(!allmodals);
  };
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
      let newmarkedentry;
      if (markedentry[activeButton] !== value) {
        newmarkedentry = automatic_obj_update(markedentry, value, activeButton);
      } else {
        newmarkedentry = automatic_obj_update(markedentry, 0, activeButton);
      }
      setMarkedentry(newmarkedentry);
    }
  };
  return (
    <div className="App">
      <div className="container-fluid">
        {/* all modals are here*/}
        <Mainmodal
          showModal={allmodals}
          title={
            allActions.indexOf(activeButton) < 2
              ? `Add ${activeButton.slice(0, activeButton.indexOf("'"))}`
              : `Add to ${activeButton.slice(activeButton.indexOf("w") + 1)}`
          }
          actions={{ control: modalupdate, mainfunction: updatedata }}
          footer={{ close: "close", mainfunction: "Add" }}
        >
          {Object.keys(objectreducerontypes(alldata, "string"))
            .filter(
              (detail) =>
                detail !== "DOB" && detail !== "sex" && detail !== "years"
            )
            .map((item) => {
              return (
                ALLREQBODIES[activeButton].includes(item) && (
                  <Textinput
                    variable={(() => {
                      if (item === "fname") {
                        return "first_name";
                      } else if (item === "lname") {
                        return "last_name";
                      } else {
                        return item;
                      }
                    })()}
                    username={objectsearch(alldata, item)}
                    placeholder={(() => {
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
                      return `Enter the ${topic}'s ${item}`;
                    })()}
                    action={updatedata}
                    ctrl={item}
                  />
                )
              );
            })}
          {ALLREQBODIES[activeButton].includes("sex") && (
            <div className="radio-group" style={{ marginTop: "2rem" }}>
              <span style={{ marginRight: "30px" }}>Sex:</span>
              <label for="male">
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  value="M"
                  style={{ marginRight: "5px" }}
                  onChange={(event) => {
                    updatedata(event, "sex");
                  }}
                  checked={alldata.sex === "M" ? true : false}
                />
                Male
              </label>
              <label for="female">
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  value="F"
                  style={{ marginRight: "5px" }}
                  onChange={(event) => {
                    updatedata(event, "sex");
                  }}
                  checked={alldata.sex === "F" ? true : false}
                />
                Female
              </label>
            </div>
          )}
          {ALLREQBODIES[activeButton].includes("category_id") &&
            (() => {
              let options = [];
              try {
                options = categories.map((category) => {
                  let { newobject } = objectreducer(category, [
                    "categoryName",
                    "years",
                  ]);
                  return newobject;
                });
                return (
                  <Dropdown2
                    options={options}
                    selected={selected.category}
                    allobject={categories}
                    topic={"category"}
                    style={{ marginTop: "2rem" }}
                    action={updateselected}
                    part={"categoryName"}
                  />
                );
              } catch (error) {
                console.error("Error:", error);
              }
            })()}
          {ALLREQBODIES[activeButton].includes("DOB") && (
            <div className="input-group">
              <label for="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                onChange={(event) => {
                  updatedata(event, "DOB");
                }}
                value={alldata["DOB"]}
              />
            </div>
          )}
          {ALLREQBODIES[activeButton].includes("years") && (
            <div className="input-container">
              <span className="input-description">
                Enter total years the category span:
              </span>
              <input
                type="text"
                className="small-input"
                value={alldata["years"]}
                onChange={(event) => updatedata(event, "years")}
              />
            </div>
          )}
          {Object.keys(nesteddeptoptions).length > 0 && (
            <CheckboxDropdown
              selectedItems={alldata["departments"]}
              title={"departments"}
              options={nesteddeptoptions}
              updateselecteditems={selecteddept}
              visiblepart={"name"}
              alldata={alldata['departments']}
            />
          )}
          {alldata["category_id"] !== 0 && (
            <div>
              {ALLREQBODIES[activeButton].includes("department_id") && (
                <Dropdown2
                  options={deptoptions.length > 0 ? deptoptions : ["all"]}
                  selected={selected.department}
                  allobject={departments}
                  topic={"department"}
                  style={{ marginTop: "2rem" }}
                  action={updateselected}
                  part={"name"}
                />
              )}
              {ALLREQBODIES[activeButton].includes("year") && (
                <Dropdown2
                  options={
                    yearsoption.length > 0 ? yearsoption : ["no year availble"]
                  }
                  selected={selected["selectedyear"]}
                  allobject={null}
                  topic={"selectedyear"}
                  style={{ marginTop: "2rem" }}
                  action={updateselected}
                />
              )}
            </div>
          )}
          {ALLREQBODIES[activeButton].includes("categories") &&
            (() => {
              let options = categories.map((item) => {
                const { id, categoryName } = item;
                return { id, categoryName };
              });
              return (
                <CheckboxDropdown
                  selectedItems={alldata["categories"]}
                  title={"categories"}
                  options={options}
                  updateselecteditems={(event) => {
                    updatedata(event, "categories");
                    console.log(nesteddeptoptions);
                  }}
                  visiblepart={"categoryName"}
                />
              );
            })()}
        </Mainmodal>
        {/*main layout*/}
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
                classtype={"col-5"}
                top={7}
                Usersimages={(() => {
                  if (allActions.indexOf(activeButton) < 2) {
                    return Usersimages;
                  } else if (activeButton === "viewSubjects") {
                    return icons !== null ? icons : Subjectimages;
                  } else {
                    return undefined;
                  }
                })()}
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
                addfunction={adddata}
                setActiveprofile={setActiveprofile}
              />
              <Personal
                testData={detail}
                imageSrc={(() => {
                  let src;
                  switch (activeButton) {
                    case "Student's Detail":
                      src = Object.keys(Usersimages).includes(
                        `${detail["first_name"]}.jpg`
                      )
                        ? Usersimages[`${detail["first_name"]}.jpg`]
                        : avatar1;
                      break;
                    case "Teacher's Detail":
                      src = Object.keys(Usersimages).includes(
                        `${detail["teacherDetail"]["fname"]}.jpg`
                      )
                        ? Usersimages[`${detail["teacherDetail"]["fname"]}.jpg`]
                        : avatar1;
                      break;
                    case "viewSubjects":
                      src = Object.keys(Subjectimages).includes(
                        `${detail["name"]}.jpg`
                      )
                        ? Subjectimages[`${detail["name"]}.jpg`]
                        : avatar1;
                      break;
                    default:
                      src = undefined;
                  }
                  return src;
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
