import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import {
  LOAD_ME_REQUEST,
  LOAD_ME_SUCCESS,
  LOAD_ME_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../types";

import { apiLoadMe, apiSignUp, apiLogIn, apiLogOut, apiChangeNickname, apiFollow, apiUnfollow } from "../../api";

function* loadMe() {
  try {
    const { data } = yield call(apiLoadMe);

    if (data && data.user) {
      yield put({
        type: LOAD_ME_SUCCESS,
        data,
      });
    } else {
      yield put({
        type: LOAD_ME_FAILURE,
        data,
      });
    }
  } catch (error) {
    console.error("error >> ", error);
    yield put({
      type: LOAD_ME_FAILURE,
      data: null, //error.response.data,
    });
  }
}

function* signup(action) {
  try {
    const { data } = yield call(apiSignUp, action.data);

    yield put({
      type: SIGNUP_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      data: error.response.data,
    });
  }
}

function* login(action) {
  try {
    const { data } = yield call(apiLogIn, action.data);

    yield put({
      type: LOGIN_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      data: error.response.data,
    });
  }
}

function* logout() {
  try {
    const { data } = yield call(apiLogOut);

    yield put({
      type: LOGOUT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      data: error.response.data,
    });
  }
}

function* changeNickname(action) {
  try {
    const { data } = yield call(apiChangeNickname, action.data);

    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      data: error.response.data,
    });
  }
}

function* follow(action) {
  try {
    const { data } = yield call(apiFollow, action.data);

    yield put({
      type: FOLLOW_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}
function* unfollow(action) {
  try {
    const { data } = yield call(apiUnfollow, action.data);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLoadMe() {
  yield takeLatest(LOAD_ME_REQUEST, loadMe);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMe),
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
