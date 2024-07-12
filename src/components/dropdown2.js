import "./top.css"; // Optional: for custom styling
import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { Splitkey } from "./splitkeydisplay";
import { arraycompare } from "./dependencies";
import { Studentcontext } from "../studentregistration";
const Dropdown2 = ({ options, selected, allobject,topic,style }) => {
  const [open, setOpen] = useState(true);
  const toggleDropdown = () => {
    setOpen(!open); // Toggle dropdown visibility
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3"
      style={style}
    >
      <p className="mb-0" style={{ marginRight: "50px" }}>
        {topic}:
      </p>
      <Dropdown show={open}>
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          onClick={toggleDropdown}
        >
          {selected}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option, index) => {
            if (typeof option === "string") {
              return <Dropdown.Item key={index}>{option}</Dropdown.Item>;
            }
            if (typeof option === "object") {
              let values = Object.values(option);
              let unique = allobject.findIndex((detail) =>
                arraycompare(Object.values(detail), values)
              );
              return (
                <Studentcontext.Consumer key={index}>
                  {(context) => (
                    <Dropdown.Item
                      variant={values.includes(selected) ? "primary" : ""}
                      align="end"
                    >
                      <div
                        id={unique}
                        onClick={(event) => {
                          let value = event.currentTarget.getAttribute(`id`);
                          alert(value);
                        }}
                      >
                        {/* Render Splitkey component here */}
                        <Splitkey refobject={option} />
                      </div>
                    </Dropdown.Item>
                  )}
                </Studentcontext.Consumer>
              );
            }
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export { Dropdown2 };
