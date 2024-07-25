import axios from "axios";
import { objectreducer } from "./dependencies";
import { updateentry } from "../action";
export const renewToken = async (userdata, dispatch) => {
    try {
    let { newobject } = objectreducer(userdata, ["role", "username", "userid"]);
    if (newobject["role"] !== 0 && newobject["userid"] !== 0) {
      try {
        let response = await axios.post(
          `http://localhost:3001/generateToken`,
          newobject,
          { headers: { "Content-Type": "application/json" } }
        );
        //console.log("it should log response here")
        dispatch(updateentry(response.data.token, "token"));
      } catch (error) {
        console.error("error:", error);
        alert("An error occurred, see console for details");
      }
    }
  } catch (error) {
    console.error("error:", error);
    alert("An error occurred with your userdata, see console for details");
  }
};
