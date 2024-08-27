import React, { useEffect, useState } from "react";
import { objectreducer } from "./dependencies";
import ClipLoader from "react-spinners/ClipLoader";
import { Splitkey } from "./splitkeydisplay";
import { Collapse, Button, Card, CardBody } from "reactstrap";
export const AccordionDropdown = ({
  title,
  content,
  selecteditems,
  setSelecteditems,
  alldata,
  visible,
  addedfunctionality,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggles, setToggles] = useState({}); // Store toggle states for each item
  const [queryResults, setQueryResults] = useState({}); // Store query results for each item
  const [maincontent, setMaincontent] = useState([]);
  useEffect(() => {
    if (addedfunctionality && Array.isArray(content)) {
      setMaincontent(content);
      content.forEach((item, index) => {
        const ignoredindex = item.indexOf(".");
        if (toggles[index]) {
          setQueryResults((prevResults) => ({
            ...prevResults,
            [index]:
              ignoredindex < 1
                ? addedfunctionality(item)
                : addedfunctionality(item.slice(ignoredindex + 1, item.length)),
          }));
        } else {
          setQueryResults((prevResults) => ({
            ...prevResults,
            [index]: { isloading: true },
          }));
        }
      });
    }
    //console.log(toggles);
  }, [toggles, addedfunctionality, content]);

  const toggleItem = (index) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [index]: !prevToggles[index],
    }));
  };
  const toggle = () => setIsOpen(!isOpen);
  const titleselector = () => {};
  //alldata?console.log(alldata):console.log("alldata is not need for unnested dropdown")
  if (Array.isArray(content) && !addedfunctionality) {
    return (
      <div>
        <Button
          color="light"
          onClick={toggle}
          style={{
            marginTop: "15px",
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{ margin: "0" }}>
            <CardBody style={{ padding: "10px" }}>
              {content.map((item, index) => (
                <p key={index} style={{ margin: "0 0 10px 0" }}>
                  <input
                    type="checkbox"
                    value={typeof item !== "object" ? item : item.id}
                    checked={(() => {
                      if (Array.isArray(selecteditems)) {
                        return (
                          selecteditems.includes(item) ||
                          selecteditems.includes(item.id)
                        );
                      } else {
                        return (
                          selecteditems === item || selecteditems === item.id
                        );
                      }
                    })()}
                    onChange={(event) => {
                      setSelecteditems(event);
                    }}
                    style={{ marginRight: "5px" }}
                  />
                  {(() => {
                    if (typeof item !== "object") {
                      return item;
                    } else if (!Array.isArray(visible) && visible) {
                      return item[visible];
                    } else {
                      const { newobject } = objectreducer(item, visible);
                      return <Splitkey refobject={newobject} />;
                    }
                  })() || null}
                </p>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
  if (
    typeof content === "object" &&
    Object.keys(content).length > 1 &&
    !Array.isArray(content)
  ) {
    return (
      <div>
        <Button
          color="light"
          onClick={toggle}
          style={{
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{ margin: "0" }}>
            <CardBody style={{ padding: "10px" }}>
              {Object.keys(content).map((key, index) => {
                let ignoredindex = key.indexOf(".") + 1;
                return (
                  <AccordionDropdown
                    title={`select ${title} within ${key.slice(
                      ignoredindex,
                      key.length
                    )}`}
                    content={content[key]}
                    selecteditems={alldata ? alldata[key] : []}
                    alldata={alldata}
                    setSelecteditems={(event) => setSelecteditems(event, key)}
                    visible={visible}
                  />
                );
              })}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
  if (maincontent.length > 0 && addedfunctionality) {
    //console.log("content items:",content);
    return (
      <div>
        <Button
          color="light"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{ margin: "0" }}>
            <CardBody style={{ padding: "10px" }}>
              {maincontent.map((item, index) => {
                const ignoredindex = item.indexOf(".") + 1;
                return (
                  <div key={index}>
                    <Button
                      color="light"
                      onClick={() => toggleItem(index)}
                      style={{
                        marginBottom: "0",
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {`${title} within ${item.slice(
                        ignoredindex,
                        item.length
                      )}`}
                      <i
                        className={`fas ${
                          toggles[index] ? "fa-chevron-up" : "fa-chevron-down"
                        }`}
                      />
                    </Button>
                    <Collapse isOpen={toggles[index]}>
                      <Card style={{ margin: "0" }}>
                        <CardBody style={{ padding: "10px" }}>
                          {queryResults[index]?.isloading && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              <ClipLoader color={"#123abc"} size={50} />
                            </div>
                          )}
                          {queryResults[index]?.data &&
                            !queryResults[index]?.error &&
                            queryResults[index]?.data['data'].map(
                              (itemchildren, childIndex) => (
                                <p
                                  key={childIndex}
                                  style={{ margin: "0 0 10px 0" }}
                                >
                                  {/*<input
                                    type="checkbox"
                                    value={
                                      typeof itemchildren !== "object"
                                        ? itemchildren
                                        : itemchildren.id
                                    }
                                    checked={(() => {
                                      if (Array.isArray(selecteditems[item])) {
                                        return (
                                          selecteditems[item].includes(
                                            itemchildren
                                          ) ||
                                          selecteditems.includes(
                                            itemchildren.id
                                          )
                                        );
                                      } else {
                                        return (
                                          selecteditems[item] ===
                                            itemchildren ||
                                          selecteditems[item] ===
                                            itemchildren.id
                                        );
                                      }
                                    })()}
                                    onChange={(event) => {
                                      setSelecteditems(event, item);
                                    }}
                                    style={{ marginRight: "5px" }}
                                  />*/}
                                  {(() => {
                                    if (typeof itemchildren !== "object") {
                                      return itemchildren;
                                    } else if (
                                      !Array.isArray(visible) &&
                                      visible
                                    ) {
                                      return itemchildren[visible];
                                    } else {
                                      const { newobject } = objectreducer(
                                        itemchildren,
                                        visible
                                      );
                                      return <Splitkey refobject={newobject} />;
                                    }
                                  })() || null}
                                </p>
                              )
                            )}
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
  if (typeof content === "object" && Object.keys(content).length === 1) {
    const ignoredindex = Object.keys(content)[0].indexOf(".");
    return (
      <div>
        <Button
          color="light"
          onClick={toggle}
          style={{
            marginTop: "15px",
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          select {title} within{" "}
          {Object.keys(content)[0].slice(
            ignoredindex,
            Object.keys(content)[0].length
          )}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{ margin: "0" }}>
            <CardBody style={{ padding: "10px" }}>
              {Array.isArray(content[Object.keys(content)[0]]) &&
                content[Object.keys(content)[0]].map((item, index) => (
                  <p key={index} style={{ margin: "0 0 10px 0" }}>
                    <input
                      type="checkbox"
                      value={typeof item !== "object" ? item : item.id}
                      checked={(() => {
                        let key = Object.keys(content)[0];
                        if (Array.isArray(selecteditems)) {
                          return (
                            alldata[key].includes(item) ||
                            alldata[key].includes(item.id)
                          );
                        } else {
                          return (
                            alldata[key] === item || alldata[key] === item.id
                          );
                        }
                      })()}
                      onChange={(event) => {
                        setSelecteditems(event);
                      }}
                      style={{ marginRight: "5px" }}
                    />
                    {(() => {
                      if (typeof item !== "object") {
                        return item;
                      } else if (!Array.isArray(visible) && visible) {
                        return item[visible];
                      } else {
                        const { newobject } = objectreducer(item, visible);
                        return <Splitkey refobject={newobject} />;
                      }
                    })() || null}
                  </p>
                ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
};
