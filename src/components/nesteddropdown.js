import React, { useState } from "react";
import { objectreducer } from "./dependencies";
import { Splitkey } from "./splitkeydisplay";
import { Collapse, Button, Card, CardBody } from "reactstrap";
// const content2 = {
//   basic: ["all"],
//   junior: ["all"],
//   senior: ["Science", "Commercial", "Art"],
// };
// const [dept, setDept] = useState({});
// const updatedept = (value, key) => {
//   let alldeptkey = Object.keys(dept);
//   if (alldeptkey.includes(key)) {
//     setDept({ ...dept, [key]: value });
//   } else {
//     let newdept = { ...dept, [key]: value };
//     setDept(newdept);
//   }
// };
export const AccordionDropdown = ({
  title,
  content,
  selecteditems,
  setSelecteditems,
  alldata,
  visible,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  if (Array.isArray(content)) {
    return (
      <div>
        <Button
          color="light"
          onClick={toggle}
          style={{
            marginTop:"15px",
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{ margin: "0" }}>
            <CardBody style={{ padding: "10px" }}>
              {content.map((item, index) => (
                <p key={index} style={{ margin: "0 0 10px 0" }}>
                  <input
                    type="checkbox"
                    value={typeof item !== "object" ? item : item.id}
                    checked={(() => {
                      if (Array.isArray(selecteditems)) {
                        return (
                          selecteditems.includes(item) ||
                          selecteditems.includes(item.id)
                        );
                      } else {
                        return (
                          selecteditems === item || selecteditems === item.id
                        );
                      }
                    })()}
                    onChange={(event) => {
                      setSelecteditems(event);
                      console.log(selecteditems);
                    }}
                    style={{ marginRight: "5px" }}
                  />
                  {(() => {
                    if (typeof item !== "object") {
                      return item;
                    } else if (!Array.isArray(visible) && visible) {
                      return item[visible];
                    } else {
                      const { newobject } = objectreducer(item, visible);
                      return <Splitkey refobject={newobject} />;
                    }
                  })()}
                </p>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
  if (typeof content === "object" && content) {
    return (
      <div>
        <Button
          color="light"
          onClick={toggle}
          style={{
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{ margin: "0" }}>
            <CardBody style={{ padding: "10px" }}>
              {Object.keys(content).map((key, index) => (
                <AccordionDropdown
                  title={`select ${title} within ${key}`}
                  content={content[key]}
                  selecteditems={alldata[key] ? alldata[key] : []}
                  setSelecteditems={(event) => setSelecteditems(event, key)}
                  visible={visible}
                />
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
};
const ObjectAccordion = () => {
  const content = {
    basic: ["all"],
    junior: ["all"],
    senior: [
      { id: 1, cate: 1, name: "Science" },
      { id: 2, cate: 1, name: "Art" },
      { id: 3, cate: 1, name: "Commercial" },
    ],
  };
  const [dept, setDept] = useState({});
  const updatedept = (event, key) => {
    let value =
      Number(event.target.value) !== NaN
        ? Number(event.target.value)
        : event.target.value;
    let allkeys = Object.keys(dept);
    console.log(dept);
    if (allkeys.includes(key)) {
      setDept({ ...dept, [key]: value });
    } else {
      let newdept = { ...dept, [key]: value };
      setDept(newdept);
    }
  };
  return (
    <AccordionDropdown
      title={"department taking course"}
      content={content}
      alldata={dept}
      setSelecteditems={updatedept}
      visible={"name"}
    />
  );
};
export default ObjectAccordion;
