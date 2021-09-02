import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import rootSaga from "./sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  // middleware ( 배포용 : 개발용 )
  const middleware = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(compose(applyMiddleware(...middleware)));

  // store생성
  const store = createStore(reducer, enhancer);

  // SSR적용할 때 SUCCESS기다리게 해주는데 사용
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development", // true면 자세한 설명추가됨
});

export default wrapper;
