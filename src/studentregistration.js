import { useState, createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { objectreducer, onselected } from "./components/dependencies";
import { updateentry } from "./action";
import { Dropdown2 } from "./components/dropdown2";
import { Bottom } from "./components";
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
  const [selected, setSelected] = useState({
    category: "select a category",
    department: "select a department",
  });
  let [page, setPage] = useState(1);
  const [btndisplay, setBtndisplay] = useState({ next: true, previous: false });
  let dispatch = useDispatch();
  let error = useSelector((state) => state.items.error);
  let data = useSelector((state) => state.items.studentdetail);
  let yearoption = [];
  useEffect(() => {
    if (page >= 2) {
      setBtndisplay((prevDisplay) => ({ ...prevDisplay, previous: true, next: false }));
    } else {
      setBtndisplay((prevDisplay) => ({ ...prevDisplay, previous: false, next: true }));
    }
  }, [page]);
    const updateselected = (arg) => {    let allkeys = Object.keys(arg);
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
      if (selected.hasOwnProperty(arg["type"])) {
        setSelected({ ...selected, [arg["type"]]: currentselection.res });
      }
      dispatch(updateentry(currentselection["id"], `${arg["type"]}_id`));
    } catch (error) {
      console.error("error:", error);
    }
    console.log(yearoption);
  };
  const updatedata = (event, key) => {
    const value =
      event.target.value || event.currentTarget.getAttribute("class");
    dispatch(updateentry(value, key));
  };
  const changepage = (event) => {
    let value = event.target.value;
    if (value === "next") {
      setPage((page += 1));
    } else {
      setPage((page -= 1));
    }
  };
  const submit = () => {
    console.log(btndisplay);
  };
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
    deptoption = departments
      .filter((detail) => detail.category_id === data.category_id)
      .map((department) => {
        let { newobject } = objectreducer(department, ["name"]);
        return newobject;
      });
  } catch (error) {
    console.error("Error:", error);
  }
  if (data.category_id !== null) {
    let cate_detail = categories.find(
      (detail) => detail.id === data.category_id
    );
    for (let year = 1; year <= cate_detail["years"]; year++) {
      yearoption.push(year);
    }
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
        <div
          className="col-md-6 d-md-block   d-flex align-items-stretch"
          style={leftHalfStyle}
        >
          <div style={redHueStyle}></div>
          {/* Content for the left half */}
        </div>
        <div className="col-md-6 d-sm-none d-md-block formholder d-flex align-items-stretch">
          {page === 1 && (
            <div>
              <Top content={"Registration"} />
              <Forms small={false} error={error}>
                <Textinput
                  variable={"FirstName"}
                  data={data.first_name}
                  placeholder={"Enter the student's firstname"}
                  action={updatedata}
                  ctrl={"first_name"}
                />
                <Textinput
                  variable={"LastName"}
                  data={data.last_name}
                  placeholder={"Enter the student's lastname"}
                  action={updateselected}
                  ctrl={"last_name"}
                />
                <br />
              </Forms>
              <Studentcontext.Provider
                value={{
                  updateselected,
                  part: { category: "categoryName", department: "name" },
                }}
              >
                <Dropdown2
                  options={options}
                  selected={selected.category}
                  allobject={categories}
                  topic={"category"}
                  style={{ position: "fixed", top: "15rem" }}
                />
                {data.category_id !== null && (
                  <Dropdown2
                    options={deptoption.length > 0 ? deptoption : ["all"]}
                    selected={selected.department}
                    allobject={departments}
                    topic={"department"}
                    style={{ position: "fixed", top: "25rem" }}
                    action={updateselected}
                  />
                )}
              </Studentcontext.Provider>
            </div>
          )}
          <Bottom
            action={changepage}
            btndisplay={btndisplay}
            ctrl={submit}
            number={page}
          />
        </div>
      </div>
    </div>
  );
};
export { Studentcontext, Registration };
