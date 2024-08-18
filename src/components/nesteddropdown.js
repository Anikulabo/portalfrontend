import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const NestedDropdown = () => {
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);

  const toggleMainDropdown = () => setMainDropdownOpen(!mainDropdownOpen);
  const toggleSubDropdown = () => setSubDropdownOpen(!subDropdownOpen);

  return (
    <Dropdown isOpen={mainDropdownOpen} toggle={toggleMainDropdown}>
      <DropdownToggle caret>
        Main Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Options</DropdownItem>
        <DropdownItem>Action 1</DropdownItem>
        <DropdownItem>Action 2</DropdownItem>
        <Dropdown isOpen={subDropdownOpen} toggle={toggleSubDropdown}>
          <DropdownToggle caret>
            Nested Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Nested Action 1</DropdownItem>
            <DropdownItem>Nested Action 2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NestedDropdown;
