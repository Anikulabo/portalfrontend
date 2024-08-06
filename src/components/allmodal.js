import { Children } from "react";
import { Modal, Button } from "react-bootstrap";
export const Mainmodal = (props) => {
  const children = Children.toArray(props.children);
  return (
    <Modal
      show={props.showModal}
      onHide={() => props.actions.control(props.ctrl, "close")}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <center>
            <h3>{props.title}</h3>
          </center>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={Object.keys(props).includes("bodyclass")?props["bodyClass"]:""}>
        {children.map((child, index) => (
          <span key={index}>{child}</span>
        ))}
      </Modal.Body>
      <Modal.Footer style={{ marginTop: "59px" }}>
        <Button
          variant="secondary"
          onClick={() => {
            props.actions.control(props.ctrl, "close");
          }}
        >
          {props.footer.close}
        </Button>
        {props.actions.mainfunction && (
          <Button
            variant="primary"
            onClick={() => {
              props.actions.mainfunction();
              props.actions.control(props.ctrl, "close");
            }}
          >
            {props.footer.mainfunction}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
