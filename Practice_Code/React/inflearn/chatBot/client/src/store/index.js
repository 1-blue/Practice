import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./reducers";

// 기본 리덕스는 Object만 받을 수 있지만 promise와 thunk를 이용해서 프로미스와 함수를 받을 수 있게 해줌
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

// store생성
export default createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
