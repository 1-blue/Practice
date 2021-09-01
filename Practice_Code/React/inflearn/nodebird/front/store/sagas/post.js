import { all, call, fork, put, takeLatest } from "redux-saga/effects";

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
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETEEW_REQUEST,
  RETEEW_SUCCESS,
  RETEEW_FAILURE,
} from "../types";

import {
  apiLoadPost,
  apiAddPost,
  apiRemovePost,
  apiAddComment,
  apiAddPostLike,
  apiRemovePostLike,
  apiUploadImages,
  apiReteew,
} from "../../api";

// 게시글 로드
function* loadPost(action) {
  try {
    const { data } = yield call(apiLoadPost, action.data);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: error.response.data,
    });
  }
}

// 게시글 추가
function* addPost(action) {
  try {
    const { data } = yield call(apiAddPost, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

// 게시글 삭제
function* removePost(action) {
  try {
    const { data } = yield call(apiRemovePost, action.data);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

// 댓글 추가
function* addComment(action) {
  try {
    const { data } = yield call(apiAddComment, action.data);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

// 좋아요추가
function* addPostLike(action) {
  try {
    const { data } = yield call(apiAddPostLike, action.data);

    yield put({
      type: POST_LIKE_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: POST_LIKE_FAILURE,
      data: error.response.data,
    });
  }
}

// 좋아요삭제
function* removePostLike(action) {
  try {
    const { data } = yield call(apiRemovePostLike, action.data);

    yield put({
      type: POST_UNLIKE_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: POST_UNLIKE_FAILURE,
      data: error.response.data,
    });
  }
}

// 이미지 추가
function* uploadImages(action) {
  try {
    const { data } = yield call(apiUploadImages, action.data);

    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      data: error.response.data,
    });
  }
}

// 리트윗
function* reteew(action) {
  try {
    const { data } = yield call(apiReteew, action.data);

    yield put({
      type: RETEEW_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: RETEEW_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPost);
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

function* watchAddPostLike() {
  yield takeLatest(POST_LIKE_REQUEST, addPostLike);
}

function* watchRemovePostLike() {
  yield takeLatest(POST_UNLIKE_REQUEST, removePostLike);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchReteew() {
  yield takeLatest(RETEEW_REQUEST, reteew);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchAddPostLike),
    fork(watchRemovePostLike),
    fork(watchUploadImages),
    fork(watchReteew),
  ]);
}
