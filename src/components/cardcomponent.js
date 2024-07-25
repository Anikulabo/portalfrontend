import React from "react";
const Card = ({ imageSrc, name, year }) => {
  return (
    <div
      className="card"
      style={{ width: "100%", height: "20rem", marginTop: "-12rem" }}
    >
      {/* Adjust width as needed */}
      <img
        src={imageSrc}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <div className="mb-3">
          <h5 className="card-title mb-0">Subject: {name}</h5>
          <h5 className="card-text mb-0">Year: {year}</h5>
        </div>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary">View Result</button>
          <button className="btn btn-secondary">Add Result</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
