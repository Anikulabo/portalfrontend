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
        props.action && props.modal
          ? props.action(props["modal"], "open")
          : alert("there is no action assigned to this button for now");
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <i className={props["iconclass"]} style={{ marginRight: "10px" }} />
        {props.content}
      </div>
    </button>
  );
};
