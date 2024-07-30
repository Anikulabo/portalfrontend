const Personal = ({imageSrc,testData}) => {
  return (
    <div
      className="col-5"
      style={{
        maxHeight: "75vh",
        marginTop: "7rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
      }}
    >
      <h3 style={{ fontWeight: "bolder", width: "100%", textAlign: "left" }}>
        Full Detail
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src={imageSrc} alt="Teacher" className="teacher-image" />
        <h3
          style={{
            fontWeight: "bolder",
            marginTop: "1rem",
            textTransform: "capitalize",
          }}
        >
          {testData["first_name"]} {testData["last_name"]}
        </h3>
      </div>
      <div
        className="basic-information"
        style={{ fontWeight: "bolder", width: "100%", textAlign: "left" }}
      >
        <h5 style={{ fontWeight: "bolder" }}>Basic Detail</h5>
        {Object.keys(testData)
          .filter((item) => item !== "first_name" && item !== "last_name"&&item!=="id")
          .map((detail) => {
            return (
              <p>
                <span style={{ color: "gray" }}>{detail} :</span>{" "}
                {testData[detail]}
              </p>
            );
          })}
      </div>
    </div>
  );
};
export default Personal;
