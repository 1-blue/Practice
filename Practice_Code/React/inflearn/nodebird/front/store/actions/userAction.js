import { LOGIN_REQUEST, LOGOUT_REQUEST } from "../types";

export function userLogin(data) {
  // 비동기처리

  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function userLogout() {
  // 비동기처리

  return {
    type: LOGOUT_REQUEST,
    data: null,
  };
}
