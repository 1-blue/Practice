import { USER_LOGIN, USER_LOGOUT } from "../types";

export function userLogin(data) {
  // 비동기처리

  return {
    type: USER_LOGIN,
    data,
  };
}

export function userLogout() {
  // 비동기처리

  return {
    type: USER_LOGOUT,
    data: null,
  };
}
