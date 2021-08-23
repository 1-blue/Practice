import { LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from "../types";

export function userLogin(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function userLogout() {
  return {
    type: LOGOUT_REQUEST,
    data: null,
  };
}

export function userSignup(data) {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
}
