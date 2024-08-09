import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  Top,
  Textinput,
  Forms,
  Bottom,
  Dropdown2,
  UploadButton,
} from "./components";
import { categories, departments } from "./studentregistration";
import { onselected, objectreducer } from "./components/dependencies";
import exam2 from "./components/img/exam2.jpg";
import { updateentry } from "./action";
export const Teacheregistration = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [btndisplay, setBtndisplay] = useState({ next: true, previous: false });
  const selected = useSelector((state) => state.items.selected);
  const teacherdetail = useSelector((state) => state.items.teacherdetail);
  const common = useSelector((state) => state.items.common);
  let error = useSelector((state) => state.items.error);
  const file=useSelector((state)=>state.items.image)
  const data = { ...teacherdetail, ...common };
  useEffect(() => {
    if (page >= 2) {
      setBtndisplay({ ...btndisplay, next: false, previous: true });
    } else {
      setBtndisplay({ ...btndisplay, next: true, previous: false });
    }
  }, [page]);
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
  };
  const leftHalfStyle = {
    height: "100vh",
    backgroundImage: `url(${exam2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };
  let options = [];
  try {
    options = categories.map((category) => {
      let { newobject } = objectreducer(category, ["categoryName"]);
      return newobject;
    });
  } catch (error) {
    console.error("Error:", error);
  }
  let deptoptions = ["all"];
  try {
    deptoptions = [
      ...deptoptions,
      ...departments
        .filter((detail) => detail.category_id === data.category_id)
        .map((item) => {
          let { newobject } = objectreducer(item, ["name"]);
          return newobject;
        }),
    ];
  } catch (error) {
    console.error("Error:", error);
    alert("error creating department array see console");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data)
    /*const formData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('name', data.name); // Append additional data
    formData.append('description', data.description); // Append additional data

    try {
      const response = await axios.post('YOUR_API_ENDPOINT_HERE', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }*/
  };
  const redHueStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  };
  const updatedata = (event, type) => {
    let value = event.target.value;
    dispatch(updateentry(value, type));
  };
  return (
    <div className="container-fluid h-100" style={{ overflowY: "auto" }}>
      <div className="row h-100">
        <div
          className="col-md-6  align-items-stretch  d-none d-sm-block"
          style={leftHalfStyle}
        >
          <div style={redHueStyle}></div>
        </div>
        <div className="col-md-6 formholder d-flex align-items-stretch d-sm-none d-md-block">
          <Top content={"Teacher registration"} />
          <Forms small={false} error={error}>
            {page === 1 && (
              <div>
                <Textinput
                  variable={"First Name"}
                  username={data.fname}
                  placeholder={"Enter the Teacher's firstname"}
                  action={updatedata}
                  ctrl={"fname"}
                />
                <Textinput
                  variable={"Last Name"}
                  username={data.lname}
                  placeholder={"Enter the Teacher's lastname"}
                  action={updatedata}
                  ctrl={"lname"}
                />
                <Textinput
                  variable={"Email address"}
                  username={data.email}
                  placeholder={"Enter the teacher's Email addess"}
                  action={updatedata}
                  ctrl={"email"}
                />
                <Textinput
                  variable={"Phone Number"}
                  username={data.email}
                  placeholder={"Enter the teacher's Phone No."}
                  action={updatedata}
                  ctrl={"phoneNo"}
                />
                <UploadButton
                />
              </div>
            )}
            {page === 2 && (
              <div>
                <Textinput
                  variable={"Home address"}
                  username={data.address}
                  placeholder={"Enter the Teacher's home address"}
                  action={updatedata}
                  ctrl={"address"}
                />
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
                    options={deptoptions}
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
          </Forms>
          <Bottom
            action={changepage}
            btndisplay={btndisplay}
            ctrl={handleSubmit}
            number={page}
          />
        </div>
      </div>
    </div>
  );
};
