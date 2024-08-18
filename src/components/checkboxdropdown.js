import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
const CheckboxDropdownItem = ({
  option,
  visiblepart,
  handleChange,
  checked,
}) => (
  <Dropdown.Item>
    <input
      type="checkbox"
      value={option.id || option}
      onChange={handleChange}
      checked={checked}
      style={{ marginRight: "8px", cursor: "pointer" }}
    />
    {option[visiblepart] || option}
  </Dropdown.Item>
);

const CheckboxDropdown = ({
  options,
  title,
  selectedItems,
  updateselecteditems,
  visiblepart,
  alldata,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentselecteditems, setCurrentselecteditems] = useState([]);

  useEffect(() => {
    setCurrentselecteditems(selectedItems);
  }, [selectedItems]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleChange = (event) => {
    updateselecteditems(event);
  };
  if (Array.isArray(options)) {
    console.log(currentselecteditems);
    return (
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <p className="mb-0" style={{ marginRight: "50px" }}>
          {title}
        </p>
        <Dropdown show={dropdownOpen}>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            onClick={toggleDropdown}
          >
            {selectedItems.length === 0 && Array.isArray(selectedItems)
              ? "Select Options"
              : `${
                  selectedItems.length ||
                  options.find((item) => item.id === currentselecteditems)[visiblepart]
                } Selected`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {options.map((option, index) => (
              <CheckboxDropdownItem
                key={index}
                option={option}
                visiblepart={visiblepart}
                handleChange={handleChange}
                checked={
                  Array.isArray(currentselecteditems)
                    ? currentselecteditems.includes(
                        typeof option === "object" ? `${option["id"]}` : option
                      )
                    : (() => {
                        if (
                          typeof currentselecteditems === "number" &&
                          typeof option === "object"
                            ? option["id"] === currentselecteditems
                            : option === currentselecteditems
                        ) {
                          return true;
                        }
                        if (
                          currentselecteditems[title] === option &&
                          typeof currentselecteditems === "object"
                        ) {
                          return true;
                        }
                      })()
                }
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  } else if (options && typeof options === "object") {
    console.log("nested loop");
    return Object.keys(options).map(
      (key) =>
        Array.isArray(options[key]) && (
          <CheckboxDropdown
            key={key}
            selectedItems={alldata[key] ? alldata[key] : []}
            title={key}
            options={options[key]}
            updateselecteditems={(event) => {
              updateselecteditems(event, key);
            }}
            visiblepart={visiblepart}
          />
        )
    );
  } else {
    return null;
  }
};

export default CheckboxDropdown;
