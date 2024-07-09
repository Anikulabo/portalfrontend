import { UPDATE } from "../action/type";
const initialstate = {
  token: null,
  userdata: { username: "", password: "", role: 0 },
  error: "",
  messages: [],
  notifications: [],
};
export const itemReducer = (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE:
      const { type, update } = action.payload;
      if (state.hasOwnProperty(type)) {
        // Handle direct state properties like 'error' and 'token'
        return {
          ...state,
          [type]: update,
        };
      } else {
        for (const { key, value } of Object.entries(state)) {
          if (typeof value === "object" && !Array.isArray(value)) {
            if (value.hasOwnProperty(type)) {
              return {
                ...state,
                [key]: { ...state[key], [type]: update },
              };
            }
          }
        }
        return state
      }
    default:
      return state;
  }
};
