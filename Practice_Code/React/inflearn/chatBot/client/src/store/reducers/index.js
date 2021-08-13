import { combineReducers } from "redux";
import chatReducer from "./chatReducer";

// 리듀서를 하나로 합쳐줌... 자동으로 state와 action값이 매개변수로 넘어감
const rootReducer = combineReducers({
  chatReducer,
});

export default rootReducer;
