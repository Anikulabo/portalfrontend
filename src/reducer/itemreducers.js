import { UPDATE } from "../action/type";
import { automatic_obj_update } from "../components/dependencies";
const initialstate = {
  token: null,
  userdata: { username: "", role: 0, password: "",userid:0 },
  error: "",
  studentdetail: {
    first_name: "",
    last_name: "",
    sex: "",
    DOB: "",
  },
  selected: {
    category: "Select a category",
    department: "select a department",
    selectedyear: "select a year",
  },
  teacherdetail: {
    fname: "",
    lname: "",
    phoneNo: "",
  },
  messages: [],
  notifications: [
    { activity: "you've been proomoted to ss1d", seen: true },
    { activity: "a new subject was added to your category", seen: false },
    { activity: "payment for pastquestion recieved", seen: false },
  ],
  common: {
    category_id: 0,
    email: "",
    address: "",
    department_id: 0,
    year: null,
    teacherid: null,
  },
  activeSession:null,
  image:null
};
export const itemReducer = (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE:
      const { update, ctrl } = action.payload;
      try {
        const newstate = automatic_obj_update(state, update, ctrl);
        return newstate;
      } catch (error) {
        console.error("error:", error);
        alert("unable to update state.see console for detail");
        return state;
      }
    default:
      return state;
  }
};
export default initialstate;
