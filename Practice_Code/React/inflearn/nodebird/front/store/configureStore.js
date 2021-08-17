import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";

const configureStore = () => {
  // middleware ( 배포용 : 개발용 )
  const middleware = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(compose(applyMiddleware(...middleware)));

  // store생성
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", // true면 자세한 설명추가됨
});

export default wrapper;
