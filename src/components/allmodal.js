import { Children } from "react";
import { Modal, Button } from "react-bootstrap";

export const Mainmodal = (props) => {
  const children = Children.toArray(props.children);

  return (
    <Modal
      show={props.showModal}
      onHide={() =>
        props.ctrl
          ? props.actions.control(props.ctrl, "close")
          : props.actions.control()
      }
      dialogClassName="custom-modal" // Use the class for custom styling
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <center>
            <h3>{props.title}</h3>
          </center>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "70vh", // Set the maximum height of the modal body
          overflowY: "auto", // Allow vertical scrolling
        }}
        className={props.bodyClass || ""} // Apply optional custom class if provided
      >
        {children.map((child, index) => (
          <span key={index}>{child}</span>
        ))}
      </Modal.Body>
      <Modal.Footer style={{ marginTop: "59px" }}>
        <Button
          variant="secondary"
          onClick={() => {
            props.ctrl
              ? props.actions.control(props.ctrl, "close")
              : props.actions.control();
          }}
        >
          {props.footer.close}
        </Button>
        {props.actions.mainfunction && (
          <Button
            variant="primary"
            onClick={(event) => {
              props.actions.mainfunction(event);
              props.ctrl
                ? props.actions.control(props.ctrl, "close")
                : props.actions.control();
            }}
          >
            {props.footer.mainfunction}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
