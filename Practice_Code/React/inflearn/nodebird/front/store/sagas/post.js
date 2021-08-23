import { all, call, fork, put, takeLatest, delay } from "redux-saga/effects";

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../types";

// import { apiLogin, apiLogout } from "../../api";

function* addPost(action) {
  try {
    // const { data } = yield call(apiLogin, action.data);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      // data: error.response.data,
    });
  }
}

function* addComment(action) {
  try {
    // const { data } = yield call(apiLogin, action.data);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      // data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
