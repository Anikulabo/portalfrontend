import { UPDATE } from "../action/type";
const initialstate = {
  token: null,
  userdata: { username: "", role: 0, password: "" },
  error: "",
  messages: [],
  notifications: [],
};
export const itemReducer = (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE:
      const { update, ctrl } = action.payload;
      if (state.hasOwnProperty(ctrl)) {
        // Handle direct state properties like 'error' and 'token'
        return {
          ...state,
          [ctrl]: update,
        };
      } else {
        for (const [key, value] of Object.entries(state)) {
          if (typeof value === "object" && !Array.isArray(value)&&value!==null) {
            if (value.hasOwnProperty(ctrl)) {
              return {
                ...state,
                [key]: { ...state[key], [ctrl]: update },
              };
            }
          }
        }
        return state;
      }
    default:
      return state;
  }
};
