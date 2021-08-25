import { all, call, fork, put, takeLatest, delay } from "redux-saga/effects";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../types";

// import { apiLogin, apiLogout } from "../../api";

function* login(action) {
  try {
    // const { data } = yield call(apiLogin, action.data);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: LOGIN_SUCCESS,
      // data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      // data: error.response.data,
    });
  }
}

function* logout() {
  try {
    // const { data } = yield call(apiLogout);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: LOGOUT_SUCCESS,
      // data,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      // data: error.response.data,
    });
  }
}

function* signup() {
  try {
    // const { data } = yield call(apiLogout);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: SIGNUP_SUCCESS,
      // data,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      // data: error.response.data,
    });
  }
}

function* follow(action) {
  try {
    // const { data } = yield call(apiLogout);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      // data: error.response.data,
    });
  }
}
function* unfollow(action) {
  try {
    // const { data } = yield call(apiLogout);

    // 임시로 1초대기
    yield delay(1000);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      // data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup), fork(watchFollow), fork(watchUnfollow)]);
}
