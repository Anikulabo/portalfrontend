import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { objectreducer, onselected } from "./components/dependencies";
import { updateentry } from "./action";
import exam4 from "./components/img/exam4.jpg";
import { Top, Textinput, Forms, Bottom, Dropdown2 } from "./components";
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
const Registration = () => {
  let selected = useSelector((state) => state.items.selected);
  let [page, setPage] = useState(1);
  const [btndisplay, setBtndisplay] = useState({ next: true, previous: false });
  let dispatch = useDispatch();
  let error = useSelector((state) => state.items.error);
  let maindetail = useSelector((state) => state.items.studentdetail);
  let common = useSelector((state) => state.items.common);
  let data = { ...maindetail, ...common };
  let yearoption = [];
  useEffect(() => {
    if (page >= 2) {
      setBtndisplay((prevDisplay) => ({
        ...prevDisplay,
        previous: true,
        next: false,
      }));
    } else {
      setBtndisplay((prevDisplay) => ({
        ...prevDisplay,
        previous: false,
        next: true,
      }));
    }
  }, [page]);
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
        dispatch(updateentry(currentselection["id"], `${arg["type"]}_id`));
      } else {
        dispatch(updateentry(currentselection["id"], `${arg["type"]}`));
      }
    } catch (error) {
      console.error("error:", error);
    }
    console.log(yearoption);
  };
  const updatedata = (event, key) => {
    const value = event.target.value;
    dispatch(updateentry(value, key));
  };
  const changepage = (event) => {
    let value = event.target.innerText;
    if (value === "Next") {
      setPage((prevPage) => {
        let newPage = prevPage + 1;
        return newPage;
      });
    } else {
      setPage((prevPage) => {
        let newPage = prevPage - 1;
        return newPage;
      });
    }
  };
  const submit = () => {
    console.log(data);
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
          className="col-md-6  align-items-stretch  d-none d-sm-block"
          style={leftHalfStyle}
        >
          <div style={redHueStyle}></div>
          {/* Content for the left half */}
        </div>
        <div className="formholder d-flex align-items-stretch  d-md-block position-relative h-100 min-vh-100 col-sm-12 col-md-6">
          <Top content={"Registration"} />
          {/* content of page 1 */}
          {page === 1 && (
            <div>
              <Forms small={false} error={error}>
                <Textinput
                  variable={"FirstName"}
                  username={data.first_name}
                  placeholder={"Enter the student's firstname"}
                  action={updatedata}
                  ctrl={"first_name"}
                />
                <Textinput
                  variable={"LastName"}
                  username={data.last_name}
                  placeholder={"Enter the student's lastname"}
                  action={updatedata}
                  ctrl={"last_name"}
                />
                <br />
              </Forms>
              <Dropdown2
                options={options}
                selected={selected.category}
                allobject={categories}
                topic={"category"}
                style={{ position: "fixed", top: "15rem" }}
                action={updateselected}
                part={"categoryName"}
              />
              {data.category_id !== null && (
                <Dropdown2
                  options={deptoption.length > 0 ? deptoption : ["all"]}
                  selected={selected.department}
                  allobject={departments}
                  topic={"department"}
                  style={{ position: "fixed", top: "25rem" }}
                  action={updateselected}
                  part={"name"}
                />
              )}
            </div>
          )}
          {/*content of page 2*/}
          {page === 2 && (
            <div>
              <Forms small={false} error={error}>
                <Dropdown2
                  options={
                    yearoption.length > 0 ? yearoption : ["no year availble"]
                  }
                  selected={selected["selectedyear"]}
                  allobject={null}
                  topic={"selectedyear"}
                  style={{ position: "fixed", top: "10rem" }}
                  action={updateselected}
                />
                <div className="radio-group">
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
                      checked={data.sex === "M" ? true : false}
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
                      checked={data.sex === "F" ? true : false}
                    />
                    Female
                  </label>
                </div>
                <div className="input-group">
                  <label for="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    onChange={(event) => {
                      updatedata(event, "DOB");
                    }}
                    value={data["DOB"]}
                  />
                </div>
                <div className="otherinput">
                  <Textinput
                    variable={"Email address"}
                    username={data.email}
                    placeholder={"Enter the student's Email addess"}
                    action={updatedata}
                    ctrl={"email"}
                  />
                  <Textinput
                    variable={"Home address"}
                    username={data.address}
                    placeholder={"Enter the student's home addess"}
                    action={updatedata}
                    ctrl={"address"}
                  />
                </div>
              </Forms>
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
export { categories, departments, Registration };
