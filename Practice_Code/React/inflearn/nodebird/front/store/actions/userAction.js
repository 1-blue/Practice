import { LOAD_ME_REQUEST, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from "../types";

export function loadMeRequest(data) {
  return {
    type: LOAD_ME_REQUEST,
    data,
  };
}

export function userLoginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function userLogoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    data: null,
  };
}

export function userSignupRequest(data) {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
}
