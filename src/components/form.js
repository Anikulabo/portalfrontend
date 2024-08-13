import "./top.css";
import React from "react";

export const Forms = ({ children, handleSubmit, error, small }) => {
  return (
    <form
      className="container-fluid position-relative"
      style={{ marginTop: "4.5rem" }}
      onSubmit={(event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log("Form submit event"); // Debug log
        handleSubmit(event);
      }}
    >
      {error && (
        <small
          className="text-danger"
          style={{ display: small ? "block" : "none", marginTop: "40px" }}
        >
          {error}
        </small>
      )}
      {React.Children.map(children, (child, index) => (
        <span key={index}>{child}</span>
      ))}
    </form>
  );
};
