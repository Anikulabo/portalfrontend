import React from "react";
import "./top.css"; // Import the CSS file

const Header = ({
  message,
  imageSrc,
  userName,
  userClass,
  action,
  searchvalue,
  notifications,
}) => {
  return (
    <div className="header">
      <p className="header-message">{message}</p>
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          className="header-search"
          placeholder="Search..."
          onChange={(event) =>
            action
              ? action(event)
              : alert("there is no event for this input for now")
          }
          value={searchvalue}
        />
      </div>
      <div
        className="others"
        style={{ marginLeft: "15px", position: "relative" }}
      >
        <div className="bell-container" style={{ position: "relative" }}>
          <i className="fas fa-bell fa-2x"></i>
          {notifications.length && (
            <div className="circular-div">{notifications.length}</div>
          )}
        </div>
        <img src={imageSrc} alt="Profile" className="header-image" />
        <div className="user-details">
          <p className="user-name">Name: {userName ? userName : "kelvin"}</p>
          <p className="user-class">Class: {userClass ? userClass : "ss1d"}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
