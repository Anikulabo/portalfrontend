import { UPDATE } from "../action/type";
import { automatic_obj_update } from "../components/dependencies";
const initialstate = {
  token: null,
  userdata: { username: "", role: 0, password: "" },
  error: "",
  studentdetail: {
    first_name: "",
    last_name: "",
    sex: "",
    DOB: "",
  },
  teacherdetail:{
    fname:"",
    lname:"",
    phoneNo:""
  },
  messages: [],
  notifications: [],
  common: {
    category_id: null,
    email: "",
    address: "",
    department_id: null,
    year: null,
    teacherid: null,
  },
};
export const itemReducer = (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE:
      const { update, ctrl } = action.payload;
      try{
        const newstate=automatic_obj_update(state,update,ctrl)
        return newstate
      }catch(error){
        console.error("error:",error)
        alert("unable to update state.see console for detail")
        return state
      }
    default:
      return state;
  }
};
export default initialstate;