
import React, { useState,useEffect } from "react";
import { Dropdown } from "react-bootstrap";

const CheckboxDropdown = ({ options, selectedItems, updateselecteditems }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let [currentselecteditems,setCurrentselecteditems]=useState([])
 useEffect(()=>{
    setCurrentselecteditems(selectedItems)
 },[selectedItems])
 const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <p className="mb-0" style={{ marginRight: "50px" }}>
        You've selected {selectedItems.length} items
      </p>
      <Dropdown show={dropdownOpen}>
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          onClick={toggleDropdown}
        >
          {selectedItems.length === 0
            ? "Select Options"
            : `${selectedItems.length} Selected`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option, index) => (
            <Dropdown.Item key={index}>
              <input
                type="checkbox"
                value={option}
                onChange={(event) => {
                  updateselecteditems(event);
                  console.log('Updated selectedItems:', selectedItems);
                }}
                checked={currentselecteditems.includes(option)}
                style={{ marginRight: "8px" }}
              />
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CheckboxDropdown;
