import React, { useState } from "react";
import { objectreducer } from "./dependencies";
import { Splitkey } from "./splitkeydisplay";
import { Collapse, Button, Card, CardBody } from "reactstrap";
export const AccordionDropdown = ({
  title,
  content,
  selecteditems,
  setSelecteditems,
  alldata,
  visible,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const titleselector = () => {};
  //alldata?console.log(alldata):console.log("alldata is not need for unnested dropdown")
  if (Array.isArray(content)) {
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
                  })()}
                </p>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
  if (typeof content === "object" && Object.keys(content).length > 1) {
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
              {Object.keys(content).map((key, index) => (
                <AccordionDropdown
                  title={`select ${title} within ${key}`}
                  content={content[key]}
                  selecteditems={alldata ? alldata[key] : []}
                  alldata={alldata}
                  setSelecteditems={(event) => setSelecteditems(event, key)}
                  visible={visible}
                />
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
  if (typeof content === "object" && Object.keys(content).length === 1) {
    return (
      <div>
        <Button
          color="light"
          onClick={toggle}
          style={{
            marginTop:"15px",
            marginBottom: "0",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          select {title} within {Object.keys(content)[0]}
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
                        let key=Object.keys(content)[0]
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
                    })()}
                  </p>
                ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
};
