import { combineReducers } from 'redux';
import {itemReducer} from "./itemreducers";
export  const rootReducer = combineReducers({
    items: itemReducer,
});