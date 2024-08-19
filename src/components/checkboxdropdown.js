import React, { useState, useEffect, useCallback } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const CheckboxDropdownItem = ({ option, visiblepart, handleChange, checked }) => (
  <DropdownItem
    toggle={false} // Prevent dropdown from closing
    style={{
      cursor: "pointer",
      backgroundColor: "transparent", // Remove bg-primary styling
    }}
    onClick={(e) => e.stopPropagation()} // Prevent event propagation to keep the dropdown open
  >
    <input
      type="checkbox"
      value={option.id || option}
      onChange={handleChange}
      checked={checked}
      style={{ marginRight: "8px", cursor: "pointer" }}
    />
    {option[visiblepart] || option}
  </DropdownItem>
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

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(prevState => !prevState);
  }, []);

  const handleChange = useCallback((event) => {
    updateselecteditems(event);
  }, [updateselecteditems]);

  const renderSelectedTitle = () => {
    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      return `${selectedItems.length} Selected`;
    } else if (currentselecteditems && visiblepart&&Array.isArray(options)) {
      const selected = options.find(
        (item) => item.id === currentselecteditems
      );
      return selected ? selected[visiblepart] : "Select Options";
    }
    return "Select Options";
  };

  if (Array.isArray(options)) {
    return (
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <p className="mb-0" style={{ marginRight: "50px" }}>
          {title}
        </p>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            {renderSelectedTitle()}
          </DropdownToggle>
          <DropdownMenu>
            {options.map((option, index) => (
              <CheckboxDropdownItem
                key={index}
                option={option}
                visiblepart={visiblepart}
                handleChange={handleChange}
                checked={Array.isArray(currentselecteditems)
                  ? currentselecteditems.includes(
                      typeof option === "object" ? `${option["id"]}` : option
                    )
                  : currentselecteditems ===
                    (typeof option === "object" ? option["id"] : option)}
              />
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  } else if (options && typeof options === "object") {
    return (
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <p className="mb-0" style={{ marginRight: "50px" }}>
          {title}
        </p>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            {renderSelectedTitle()}
          </DropdownToggle>
          <DropdownMenu>
            {Object.keys(options).map((key) => (
              <DropdownItem key={key} toggle={false} style={{ backgroundColor: "transparent" }}>
                <CheckboxDropdown
                  selectedItems={alldata[key] || []}
                  title={key}
                  options={options[key]}
                  updateselecteditems={(event) => updateselecteditems(event, key)}
                  visiblepart={visiblepart}
                  alldata={alldata}
                />
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  } else {
    return null;
  }
};

export default CheckboxDropdown;
