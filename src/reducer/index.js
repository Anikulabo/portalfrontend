import { Reducers } from "redux";
import itemReducer from "./itemreducers";

export  const rootReducer = Reducers({
    items: itemReducer,
});