export const Inputpassword = (props) => {
  return (
    <div style={{ marginTop: "25px", marginLeft: "0" }}>
      {props.variable}
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={props.type ? "password" : "text"}
          className="data"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event) => {
            props.action.addupdate(event,'password');
            props.action.hideicon(event);
          }}
        />
        <i
          class={!props.type ? "fa fa-eye" : "fa fa-eye-slash"}
          style={{
            display: props.eyeicon ? "block" : "none",
            marginLeft: "-3rem",
          }}
          onClick={() => props.action.changeType()}
        />
      </div>
      <br />
    </div>
  );
};
