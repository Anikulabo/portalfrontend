import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import { objectreducer, onselected } from "./components/dependencies";
//import { arraycompare } from "./components/dependencies";
import { Dropdown2 } from "./components/dropdown2";
import exam4 from "./components/img/exam4.jpg";
import { Top, Textinput, Forms } from "./components";

const categories = [
  { id: 1, categoryName: "senior", years: 3 },
  { id: 2, categoryName: "basic", years: 6 },
  { id: 3, categoryName: "junior", years: 3 },
];

const departments = [
  { id: 1, category_id: 1, name: "science" },
  { id: 2, category_id: 1, name: "art" },
  { id: 3, category_id: 1, name: "commercial" },
];

const Studentcontext = createContext();

const Registration = () => {
  const [data, setData] = useState({ firstname: "", lastname: "" });
  const [selected, setSelected] = useState({
    category: "select category",
    department: "select department",
  });

  let error = useSelector((state) => state.items.error);

  const updateselected = (event) => {
    try {
      let currentselection = onselected(event, categories, "categoryName");
      setSelected({ ...selected, category: currentselection });
    } catch (error) {
      console.error("error:", error);
    }
  };
  const updatedata=(event,key)=>{
    const value=event.target.value;
    if(data.hasOwnProperty(key)){
      setData({...data,[key]:value})
    }
  }
  const leftHalfStyle = {
    height: "100vh",
    backgroundImage: `url(${exam4})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  let options = [];
  try {
    options = categories.map((category) => {
      let { newobject } = objectreducer(category, ["categoryName", "years"]);
      return newobject;
    });
  } catch (error) {
    console.error("Error:", error);
  }

  let deptoption = [];
  try {
    deptoption = departments.map((department) => {
      let { newobject } = objectreducer(department, ["name"]);
      return newobject;
    });
  } catch (error) {
    console.error("Error:", error);
  }

  const redHueStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  };
  return (
    <div className="container-fluid h-100" style={{ overflowY: "auto" }}>
      <div className="row h-100">
        <div className="col-md-6 d-md-block   d-flex align-items-stretch" style={leftHalfStyle}>
          <div style={redHueStyle}></div>
          {/* Content for the left half */}
        </div>
        <div className="col-md-6 d-sm-none d-md-block formholder d-flex align-items-stretch">
          <Top content={"Registration"} />
          <Forms small={false} error={error}>
            <Textinput
              variable={"firstName"}
              data={data.firstname}
              placeholder={"Enter the student's firstname"}
              action={updatedata}
              ctrl={"firstname"}
            />
            <Textinput
              variable={"lastName"}
              data={data.lastname}
              placeholder={"Enter the student's lastname"}
              action={updatedata}
              ctrl={"lastname"}
            />
            <br />
          </Forms>
          <Studentcontext.Provider value={{ updateselected }}>
            <Dropdown2
              options={options}
              selected={selected.category}
              allobject={categories}
              topic={"Category"}
              style={{ position: "fixed", top: "15rem" }}
            />
          </Studentcontext.Provider>
          <Dropdown2
            options={deptoption}
            selected={selected.department}
            allobject={departments}
            topic={"Department"}
            style={{ position: "fixed", top: "25rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export { Studentcontext, Registration };
