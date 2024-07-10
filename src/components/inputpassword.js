import { useContext } from "react";
import { Allcontext } from "../login";
export const Inputpassword = (props) => {
  const { addpassword, hideicon, changeType } = useContext(Allcontext);
  return (
    <div style={{ marginTop: "25px", marginLeft: "0" }}>
      {props.variable}
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={props.type ? "password" : "text"}
          className="data"
          placeholder={props.placeholder}
          onChange={(event) => {
            addpassword(event);
            hideicon(event);
          }}
        />
        <i
          class={!props.type ? "fa fa-eye" : "fa fa-eye-slash"}
          style={{
            display: props.eyeicon ? "block" : "none",
            marginLeft: "-3rem",
          }}
          onClick={() => changeType()}
        />
      </div>
      <br />
    </div>
  );
};
