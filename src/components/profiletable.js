import React, { useState } from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import avatar1 from "./img/Avatart1.jpg";
const ProfileTable = ({
  tabledata,
  Usersimages,
  activeprofile,
  setActiveprofile,
  topic,
  addmarkedentry,
  markedentries,
  classtype,
  top,
  addfunction,
  isLoading, // Pass this as a prop to show the spinner
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let consoleduserimages = Usersimages
    ? Object.keys(Usersimages).map((image) => {
        let dotindex = image.indexOf(".");
        return image.slice(0, dotindex);
      })
    : null;
  const filteredData =
    searchTerm !== ""
      ? tabledata.filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tabledata;

  return (
    <div
      className={`table-container ${classtype}`}
      style={{
        overflowY: "auto",
        maxHeight: "75vh",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: `${top}rem`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ fontWeight: "bolder" }}>{topic}</h3>
          <div
            className="position-relative"
            style={{ marginLeft: "1rem", width: "100%" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ paddingLeft: "2.5rem" }}
            />
            <i
              className="fas fa-search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            ></i>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
          </div>
        ) : filteredData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Marked</th>
                {Usersimages && (
                  <th>{topic !== "Subjects" ? "Profile" : "Icon"}</th>
                )}
                {Object.keys(filteredData[0])
                  .filter((item) => item !== "id")
                  .map((item, headindex) => (
                    <th key={headindex}>{item}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => {
                        addmarkedentry(item.id);
                      }}
                      checked={
                        (Array.isArray(markedentries) &&
                          markedentries.includes(item.id)) ||
                        (markedentries === item.id &&
                          typeof markedentries === "number")
                          ? true
                          : false
                      }
                    />
                  </td>
                  {Usersimages && (
                    <td
                      className={
                        activeprofile && item.id === activeprofile
                          ? "bg-primary text-light"
                          : ""
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        activeprofile
                          ? setActiveprofile(item.id)
                          : console.log(item.id)
                      }
                    >
                      <img
                        src={
                          Usersimages[
                            `${consoleduserimages.find((img) =>
                              Object.values(item).includes(img)
                            )}.jpg`
                          ] || avatar1
                        }
                        alt="Profile"
                        className="header-image"
                      />
                    </td>
                  )}
                  {Object.keys(item)
                    .filter((item) => item !== "id")
                    .map((detail, childindex) => (
                      <td
                        key={childindex}
                        className={
                          activeprofile && item.id === activeprofile
                            ? "bg-primary text-light"
                            : ""
                        }
                        style={{
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          activeprofile
                            ? setActiveprofile(item.id)
                            : console.log(item.id);
                        }}
                      >
                        {`${item[detail]}`}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "There is no data in our database"
        )}
      </div>
      <div
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          paddingBottom: "20px",
        }}
      >
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-primary mr-2"
            style={{ marginRight: "15px" }}
            onClick={addfunction}
          >
            <i className="fas fa-plus"></i> Add a new entry
          </button>
          <button
            className={`btn btn-secondary ${
              (markedentries.length ||
                (typeof markedentries === "number" && markedentries > 0)) > 0
                ? ""
                : "d-none"
            }`}
          >
            <i className="fas fa-edit"></i> Update entries
          </button>
        </div>
      </div>
    </div>
  );
};

ProfileTable.propTypes = {
  tabledata: PropTypes.array.isRequired,
  Usersimages: PropTypes.object.isRequired,
  activeprofile: PropTypes.number.isRequired,
  setActiveprofile: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired, // Add this prop
};

export default ProfileTable;
