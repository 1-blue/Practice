import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // action.payload에 getServerSideProps로 호출한 dispatch의 결과값이 들어가 있음
      // 그걸 반환해서 store에 그대로 값이 들어가게 됨
      return action.payload;

    default:
      const combinedReducer = combineReducers({
        userReducer,
        postReducer,
      });
      return combinedReducer(state, action);
  }
};

export default rootReducer;
