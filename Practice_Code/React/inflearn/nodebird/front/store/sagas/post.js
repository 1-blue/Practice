import { all, call, fork, put, takeLatest, delay } from "redux-saga/effects";
import shortId from "shortid";

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../types";

// import { apiLogin, apiLogout } from "../../api";

// 게시글 추가
function* addPost(action) {
  try {
    // const { data } = yield call(apiLogin, action.data);

    // 임시로 1초대기
    yield delay(1000);

    const postId = shortId.generate();

    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        ...action.data,
        postId,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: {
        ...action.data,
        postId,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      // data: error.response.data,
    });
  }
}

// 게시글 삭제
function* removePost(action) {
  try {
    // 임시로 1초대기
    yield delay(1000);

    // post삭제 api
    // const { data } = yield call(apiLogin, action.data);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
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

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
