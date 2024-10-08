import "./top.css";

export const Bottom = ({ number, action, btndisplay, ctrl }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "70%", // Adjust to center the buttons horizontally
        transform: "translateX(-50%)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginBottom: "10px", // Adjust as needed
      }}
    >
      <button
        className="btn btn-light text-light previous-button"
        style={{
          backgroundColor: "rgb(81, 194, 37)",
          display: btndisplay["previous"] ? "block" : "none",
        }}
        onClick={(event) => {
          event.preventDefault();
          action(event);
        }}
      >
        <i className="fas fa-arrow-left"></i>
        <span style={{ marginLeft: "3px" }}> Previous</span>
      </button>
      <button
        className="btn btn-light text-light"
        style={{ backgroundColor: "rgb(81, 194, 37)" }}
        type="submit" // Corrected type attribute
      >
        <i className="fas fa-check"></i>
        <span style={{ marginLeft: "3px" }}>Submit</span>
      </button>
      <button
        className="btn btn-light text-light next-button"
        style={{
          backgroundColor: "rgb(81, 194, 37)",
          display: btndisplay["next"] ? "block" : "none",
        }}
        onClick={(event) => {
          event.preventDefault();
          action(event);
        }}
      >
        <span style={{ marginRight: "3px" }}>Next</span>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};
