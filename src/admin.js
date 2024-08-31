import Subjectimages, {
  Header,
  Sidebar,
  Usersimages,
  ProfileTable,
  Personal,
  Textinput,
  Dropdown2,
  AccordionDropdown,
  UploadButton,
} from "./components";
import avatar1 from "./components/img/Avatart1.jpg";
import { Mainmodal } from "./components";
import {
  automatic_obj_update,
  objectreducerontypes,
  objectsearch,
  objectreducer,
  updateselected,
  fetchTeachersByCategory,
  fetchTeachers,
} from "./components/dependencies";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { base64ToFile } from "./components/dependencies";
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
  const token = useSelector((state) => state.items.token);
  let teachersdetail = useSelector((state) => state.items.teacherDetail);
  let studentdetails = useSelector((state) => state.items.studentdetail);
  const img = useSelector((state) => state.items.image);
  let common = useSelector((state) => state.items.common);
  const [alldbsearch, setAlldbsearch] = useState({ dept: null, cate: null });
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
  const {
    data: teacherData,
    error: teacherError,
    isLoading: teacherLoading,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => fetchTeachers(token, 0, 2),
    enabled: token !== null, // Fetch only when token is not null
  });
  /*const {
    data: studentData,
    error: studentError,
    isloading: studentLoading,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => fetchTeachers(token, 0, 3),
    enabled: token !== null,
  });*/
  const [activeButton, setActiveButton] = useState("Teacher's Detail");
  const [activeprofile, setActiveprofile] = useState(1);
  let [teachers, setTeachers] = useState(all_teachers);
  const [fulldetail, setFulldetail] = useState({
    tabledata: [],
    isloading: true,
  });

  useEffect(() => {
    const newTableData = teacherData
      ? teacherData["detail"].map((item) => {
          const { newobject } = objectreducer(
            item,
            ALLVISIBLEPART["Teacher's Detail"]
          );
          return newobject;
        })
      : all_teachers.map((item) => {
          const { newobject } = objectreducer(
            item,
            ALLVISIBLEPART["Teacher's Detail"]
          );
          return newobject;
        });

    setFulldetail({
      tabledata: newTableData,
      isloading: teacherLoading,
    });
  }, [teacherData, teacherLoading, teachers]);
  const icons = useSelector((state) => state.items.allsubjecticons);
  const navigate = useNavigate();
  const deptoptions = useMemo(() => {
    if (alldata && alldata["category_id"] !== null) {
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
        options[`dept.${categoryName}`] =
          dept_under_categories.length > 0
            ? dept_under_categories
            : [{ id: 0, category_id: Number(item), name: "all" }];
        if (
          !options[`dept.${categoryName}`].find(
            (detail) => detail.name === "all"
          )
        ) {
          options[`dept.${categoryName}`].push({
            id: 0,
            category_id: Number(item),
            name: "all",
          });
        }
      });
    }
    return options;
  }, [alldata["categories"], departments, categories]);
  const {
    data: teachersBycategory,
    error: teacherByCategoryError,
    isLoading: teacherByCategoryLoading,
  } = useQuery({
    queryKey: ["teachersByCategory", alldbsearch["dept"], alldbsearch["cate"]],
    queryFn: () =>
      fetchTeachersByCategory(alldbsearch["dept"], alldbsearch["cate"], token),
    enabled: token !== null && !Object.values(alldbsearch).includes(null),
  });

  const selectedteachers = useCallback(
    (cate, event) => {
      let value = !isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : event.target.value;
      //console.log("here is the cate-value pair:", { cate, value });
      if (Object.keys(alldata["teachers"]).length > 0) {
        const newobject = { ...alldata["teachers"] };
        if (newobject[cate].includes(value)) {
          newobject[cate] = newobject[cate].filter(
            (teacher) => teacher !== value
          );
          //console.log(newobject);
        } else {
          newobject[cate].push(value);
        }
        setAlldata({ ...alldata, teachers: newobject });
        console.log("selected teachers:", alldata["teachers"]);
      }
    },
    [alldata]
  );
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
  let [allmodals, setAllmodals] = useState(false);
  const updateselectedhere = (arg) => {
    updateselected(arg, dispatch, setAlldata, automatic_obj_update, alldata);
  };
  const adddata = () => {
    switch (activeButton) {
      case "Teacher's Detail":
        navigate("/teacheregistration", { replace: false });
        break;
      default:
        setAllmodals(true);
    }
  };
  const updatedata = (event, part) => {
    let value = event.target.value || event.target.innerText;
    let submittedvalue =
      !isNaN(Number(value)) && value !== "" ? Number(value) : value;
    let newdatas = automatic_obj_update(alldata, submittedvalue, part);
    setAlldata(newdatas);
  };
  const selecteddept = useCallback(
    (event, dept) => {
      console.log("departments b4 selection:", alldata["departments"]);
      let newdept = { ...alldata["departments"] };
      if (dept && event) {
        let value = event.target.value;
        newdept[dept] = !isNaN(Number(value)) ? Number(value) : value;
      }
      setAlldata((Prevalldata) => ({
        ...Prevalldata,
        departments: { ...Prevalldata.departments, ...newdept },
      }));
    },
    [nesteddeptoptions]
  );

  const addedfunctionality = useCallback(
    (value) => {
      if (!alldata["departments"] || !categories) {
        console.log("alldata or categories not yet available");
        return;
      }

      let cate_detail = categories.find((item) => item.categoryName === value);
      console.log("Category Detail:", cate_detail);
      console.log("Department Data:", alldata["departments"][`dept.${value}`]);

      if (cate_detail && alldata["departments"][`dept.${value}`] !== null) {
        console.log("it is working up to this point");
        const updatedDept = alldata["departments"][`dept.${value}`];
        setAlldbsearch((prevSearch) => ({
          ...prevSearch,
          cate: cate_detail.id,
          dept: updatedDept,
        }));
        return {
          data: teachersBycategory,
          isloading: teacherByCategoryLoading,
          error: teacherByCategoryError,
        };
      } else {
        console.log("Condition not met");
      }
    },
    [alldata["departments"], alldbsearch]
  );

  useEffect(() => {
    let newdept = { ...alldata["departments"] }; // Create a copy to avoid direct mutation

    if (nesteddeptoptions) {
      const all_expected_dept_keys = Object.keys(nesteddeptoptions);
      const unmatchingKeys = Object.keys(newdept).filter(
        (item) => !all_expected_dept_keys.includes(item)
      );

      // Update or add department keys based on nesteddeptoptions
      for (const key of all_expected_dept_keys) {
        if (nesteddeptoptions[key].length === 1) {
          newdept[key] = nesteddeptoptions[key][0].id;
        }
      }

      // Remove unmatching keys
      if (unmatchingKeys.length > 0) {
        unmatchingKeys.forEach((key) => {
          delete newdept[key];
        });
      }
    }

    setAlldata((Prevalldata) => ({ ...Prevalldata, departments: newdept }));
  }, [nesteddeptoptions]);

  useEffect(() => {
    if (alldata["categories"] && alldata["categories"].length > 0) {
      let newteachers = {};
      categories
        .filter((item) => alldata["categories"].includes(item.id))
        .forEach((detail) => {
          const teacherKey = `teach.${detail.categoryName}`;
          if (Object.keys(alldata["teachers"]).includes(teacherKey)) {
            newteachers[teacherKey] = alldata["teachers"][teacherKey];
          } else {
            newteachers[teacherKey] = [];
          }
        });
      setAlldata((prevData) => ({
        ...prevData,
        teachers: newteachers,
      }));
    }
  }, [alldata["categories"]]);
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
        if (!teacherLoading && teacherData) {
          const newTableData = teacherData["detail"].map((item) => {
            const { newobject } = objectreducer(
              item,
              ALLVISIBLEPART["Teacher's Detail"]
            );
            return newobject;
          });
          setFulldetail({
            tabledata: newTableData,
            isloading: teacherLoading,
          });
        } else {
          const tabledata = all_teachers.map((item) => {
            const { newobject } = objectreducer(
              item,
              ALLVISIBLEPART["Teacher's Detail"]
            );
            return newobject;
          });
          setFulldetail({
            ...fulldetail,
            tabledata: tabledata,
            isLoading: teacherLoading,
          });
        }
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
  const allsubmission = async (event) => {
    event.preventDefault();
    const ADD_APIGATEWAYS = {
      "Teacher's Detail": "teacher",
      viewSubjects: "subject",
    };

    if (!token) {
      alert("You're not logged in properly");
      return;
    }

    const formData = new FormData();
    const specialKeys = ["departments", "teachers", "compulsory"];
    const requiredFields = ALLREQBODIES[activeButton];

    // Helper function to handle form data appending
    const appendFormData = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    };

    requiredFields.forEach((field) => {
      const fieldValue = alldata[field];

      if (fieldValue) {
        if (typeof fieldValue === "object") {
          if (
            Array.isArray(fieldValue) &&
            fieldValue.length > 0 &&
            !specialKeys.includes(field) // <-- Corrected here
          ) {
            if (!specialKeys.includes(field)) {
              appendFormData(field, fieldValue);
            } else {
              switch (field) {
                case "compulsory":
                  const compulsory = {};
                  if (
                    Array.isArray(alldata["categories"]) &&
                    alldata["categories"].length > 0
                  ) {
                    alldata["categories"].forEach((category) => {
                      const categoryDetail = categories.find(
                        (c) => c.id === category
                      );
                      if (categoryDetail) {
                        compulsory[categoryDetail["categoryName"]] =
                          fieldValue.includes(categoryDetail["categoryName"]);
                      }
                    });
                    appendFormData("compulsory", JSON.stringify(compulsory));
                  }
                  break;
                default:
                  // Handle other special cases if needed
                  break;
              }
            }
          } else if (Object.keys(fieldValue).length > 0) {
            if (!specialKeys.includes(field)) {
              appendFormData(field, fieldValue);
            } else {
              const newFieldValue = {};
              Object.keys(fieldValue).forEach((key) => {
                const ignoredIndex = key.indexOf(".") + 1;
                const trimmedKey = key.slice(ignoredIndex);
                newFieldValue[trimmedKey] = fieldValue[key];
              });
              appendFormData(field, JSON.stringify(newFieldValue));
            }
          }
        } else if (
          typeof fieldValue === "string" ||
          typeof fieldValue === "number"
        ) {
          appendFormData(field, fieldValue);
        }
      }
    });

    // Validate all required fields have been filled
    const unfilledFields = requiredFields.filter(
      (field) =>
        !alldata[field] ||
        (typeof alldata[field] === "object" &&
          ((Array.isArray(alldata[field]) && alldata[field].length === 0) ||
            (Object.keys(alldata[field]).length === 0 &&
              field !== "compulsory")))
    );

    if (unfilledFields.length > 0) {
      alert(
        `You need to provide values for the following items: ${unfilledFields.join(
          ", "
        )}`
      );
      return;
    }

    if (img) {
      const imageFile = base64ToFile(img, "image.jpeg"); // Ensure 'img' is base64 string
      formData.append("file", imageFile);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/${ADD_APIGATEWAYS[activeButton]}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle response or errors
      if (response.status !== 200) {
        alert(`Submission failed: ${response.statusText}`);
        throw new Error(`Submission failed: ${response.statusText}`);
      }
      let newalldata = { ...alldata };
      requiredFields.forEach((element) => {
        if (Array.isArray(alldata[element])) {
          newalldata = automatic_obj_update(newalldata, [], element);
        } else if (typeof alldata[element] === "object") {
          newalldata = automatic_obj_update(newalldata, {}, element);
        } else if (typeof alldata[element] === "string") {
          newalldata = automatic_obj_update(newalldata, "", element);
        } else if (typeof alldata[element] === "number") {
          newalldata = automatic_obj_update(newalldata, 0, element);
        }
      });
      setAlldata(newalldata)
      console.log("Submission successful:", response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
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
          actions={{ control: modalupdate, mainfunction: allsubmission }}
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
          {alldata["category_id"] !== 0 && (
            <div>
              {ALLREQBODIES[activeButton].includes("department_id") && (
                <Dropdown2
                  options={deptoptions.length > 0 ? deptoptions : ["all"]}
                  selected={selected.department}
                  allobject={departments}
                  topic={"department"}
                  style={{ marginTop: "2rem" }}
                  action={updateselectedhere}
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
                  action={updateselectedhere}
                />
              )}
            </div>
          )}
          {ALLREQBODIES[activeButton].includes("categories") && (
            <AccordionDropdown
              selecteditems={alldata["categories"]}
              title={"categories"}
              content={categories.map((item) => {
                const { id, categoryName } = item;
                return { id, categoryName };
              })}
              setSelecteditems={(event) => {
                updatedata(event, "categories");
              }}
              visible={"categoryName"}
            />
          )}
          {activeButton === "viewSubjects" && <UploadButton />}
          {Object.keys(nesteddeptoptions).length > 0 && (
            <div>
              <AccordionDropdown
                title={"departments taking course"}
                content={nesteddeptoptions}
                setSelecteditems={selecteddept}
                alldata={alldata["departments"]}
                visible={"name"}
              />
              <AccordionDropdown
                selecteditems={alldata.compulsory}
                title={
                  Object.keys(nesteddeptoptions).length > 1
                    ? "select categories where subject is compulsory"
                    : "select if subject is compulsory"
                }
                content={Object.keys(nesteddeptoptions).map((item) => {
                  let ignoredindex = item.indexOf(".") + 1;
                  return item.slice(ignoredindex, item.length);
                })}
                setSelecteditems={(event) => {
                  updatedata(event, "compulsory");
                }}
              />
            </div>
          )}
          {token && Object.keys(alldata["departments"]).length > 0 && (
            <div>
              <AccordionDropdown
                title="Select Teachers"
                content={Object.keys(alldata["teachers"])}
                visible={["fname", "Total_subject"]}
                selecteditems={alldata["teachers"]}
                setSelecteditems={selectedteachers}
                addedfunctionality={addedfunctionality}
              />
            </div>
          )}
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
                isLoading={fulldetail.isloading}
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
