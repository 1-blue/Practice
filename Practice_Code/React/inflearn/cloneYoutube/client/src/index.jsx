import React from "react";
import ReactDOM from "react-dom";

// 나만의 기본 css 초기화
import "@/css/reset.css";
import "@/css/common.css";

// 리덕스
import { Provider } from "react-redux";
import store from "@/store";

// 컴포넌트 가져오기
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
