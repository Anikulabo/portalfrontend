import React from "react";
import "./top.css"; // Import the CSS file
export const Button = (props) => {
  return (
    <button
      className={
        props.class ? `fixed-width-button ${props.class}` : "fixed-width-button"
      }
      style={props.style}
      onClick={(event) => {
        props.action
          ? props.action(event)
          : alert("there is no action assigned to this button for now");
      }}
    >
      {props.content}
    </button>
  );
};
