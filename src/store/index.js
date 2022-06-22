import userReducer from "./userReducer";
import { combineReducers } from "redux";
import channelReducer from "./channelReducer";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});

export default rootReducer;
