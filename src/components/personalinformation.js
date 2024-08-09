import ProfileTable from "./profiletable";
import { useState } from "react";
const Personal = ({ imageSrc, testData }) => {
  const [details, SetDetails] = useState([]);
  function adddetails(value) {
    if (!details.includes(value)) {
      SetDetails([...details, value]);
    } else {
      SetDetails(details.filter((item) => item !== value));
    }
  }
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
        }
        if (
          typeof mainobject[item] === "object" &&
          mainobject[item] !== null &&
          !Array.isArray(mainobject[item])
        ) {
          return splitter(mainobject[item], unwanted);
        }
        if (Array.isArray(mainobject[item])) {
          return (
            <ProfileTable
              top={1}
              classtype={"container-fluid"}
              tabledata={mainobject[item]}
              topic={item}
              addmarkedentry={adddetails}
              markedentries={details}
            />
          );
        }
        if (mainobject[item] === null) {
          return (
            <p key={index}>
              <span style={{ color: "gray" }}>{item} :</span> All
            </p>
          );
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
            {(() => {
              if (testData["teacherDetail"]) {
                return `${testData["teacherDetail"]["fname"]} ${testData["teacherDetail"]["lname"]}`;
              } else if (testData["first_name"]) {
                return `${testData["first_name"]} ${testData["last_name"]}`;
              } else {
                return `${testData["name"]}`;
              }
            })()}
          </h3>
        </div>
      )}
      <div
        className="basic-information"
        style={{ fontWeight: "bolder", width: "100%", textAlign: "left" }}
      >
        <h5 style={{ fontWeight: "bolder" }}>Basic Detail</h5>
        {(() => {
          return splitter(testData, [
            "first_name",
            "last_name",
            "fname",
            "lname",
            "id",
          ]);
        })()}
      </div>
    </div>
  );
};
export default Personal;
