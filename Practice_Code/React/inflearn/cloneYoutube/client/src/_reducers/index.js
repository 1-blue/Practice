import { combineReducers } from "redux";
import userReducer from "./userReducer";

// 리듀서를 하나로 합쳐줌
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
