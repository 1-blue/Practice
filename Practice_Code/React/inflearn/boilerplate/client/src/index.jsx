import React from "react";
import ReactDOM from "react-dom";

// css 가져오기
import "antd/dist/antd.css";

// 리덕스
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./_reducers/index";

// 컴포넌트 가져오기
import App from "./App";

// 기본 리덕스는 Object만 받을 수 있지만 promise와 thunk를 이용해서 프로미스와 함수를 받을 수 있게 해줌
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root"),
);
