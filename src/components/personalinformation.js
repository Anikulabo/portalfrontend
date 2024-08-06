const Personal = ({ imageSrc, testData }) => {
  function splitter(mainobject, unwanted) {
    return Object.keys(mainobject)
      .filter((key) => !unwanted.includes(key))
      .map((item, index) => {
        if (typeof mainobject[item] !== "object") {
          return (
            <p key={index}>
              <span style={{ color: "gray" }}>{item} :</span> {mainobject[item]}
            </p>
          );
        } else {
          return splitter(mainobject[item], unwanted);
        }
      });
  }

  return (
    <div
      className="col-7"
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
      {imageSrc && (
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
            {testData["teacherDetail"]
              ? `${testData["teacherDetail"]["fname"]} ${testData["teacherDetail"]["lname"]}`
              : `${testData["first_name"]} ${testData["last_name"]}`}
          </h3>
        </div>
      )}
      <div
        className="basic-information"
        style={{ fontWeight: "bolder", width: "100%", textAlign: "left" }}
      >
        <h5 style={{ fontWeight: "bolder" }}>Basic Detail</h5>
        {(()=>{
          return splitter(testData,["first_name","last_name","fname","lname","id"])
        })()}
      </div>
    </div>
  );
};
export default Personal;
