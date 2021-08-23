import { all, fork } from "redux-saga/effects";

import userSage from "./user";
import postSage from "./post";

export default function* rootSaga() {
  yield all([fork(userSage), fork(postSage)]);
}
