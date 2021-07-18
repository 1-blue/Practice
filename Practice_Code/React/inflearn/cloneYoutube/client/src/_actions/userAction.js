import { apiLogin, apiRegister, apiAuth } from "../api/index";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

// 로그인
export async function loginUser(body) {
  const data = await apiLogin(body);

  return {
    type: LOGIN_USER,
    payload: data,
  };
}

// 회원가입
export async function registerUser(body) {
  const data = await apiRegister(body);

  return {
    type: REGISTER_USER,
    payload: data,
  };
}

// 유저인증
export async function authUser() {
  const data = await apiAuth();

  return {
    type: AUTH_USER,
    payload: data,
  };
}
