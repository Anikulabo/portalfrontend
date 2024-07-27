import favicon from "./img/unaab.jpeg";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./top.css";
const Sidebar = ({ items, handleButtonClick, active }) => {
  return (
    <div className="bg-light col-md-2 bg-light sidebar">
      <div className="inline-container">
        <img
          className="round-image"
          src={favicon}
          alt="the school logo should show here"
          height="40px"
        />
        <p>
          FUNAAB
          <small className="small-text">
            Federal University of Agriculture,Abeokuta
          </small>
        </p>
      </div>
      <Nav className="flex-column">
        {items.map((item,index) => {
          return (
            <Nav.Item key={index}>
              <Nav.Link
                className={`nav-link w-100 ${
                 item===active ? "active" : ""
                }`}
                onClick={() => handleButtonClick(item)}
              >
                {item}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
