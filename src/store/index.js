import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  use: userReducer,
});

export default rootReducer;
