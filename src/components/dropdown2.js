import "./top.css"; // Optional: for custom styling
import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { Splitkey } from "./splitkeydisplay";
import { arraycompare } from "./dependencies";
import { Studentcontext } from "../studentregistration";
const Dropdown2 = ({ options, selected, allobject, topic, style, action }) => {
  const [open, setOpen] = useState(false);
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
            if (typeof option === ("string" || "number")) {
              return (
                <Dropdown.Item
                  variant={option === selected ? "primary" : ""}
                  key={index}
                  id={0}
                  onClick={(event) => {
                    action ? action({event, type:topic}) : console.log(index);
                   toggleDropdown()
                  }}
                >
                  {option}
                </Dropdown.Item>
              );
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
                      align="end"
                      className={
                        values.includes(selected) ? "bg-primary text-light" : ""
                      }
                    >
                      <div
                        id={unique}
                        onClick={(event) => {
                          let visiblepart = context["part"][topic];
                          context.updateselected({
                            event,
                            mainobject:allobject,
                            visiblepart,
                            type:topic,
                          });
                          toggleDropdown();
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
            return;
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export { Dropdown2 };
