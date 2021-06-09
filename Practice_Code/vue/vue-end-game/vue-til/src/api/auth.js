// 로그인, 회원가입, 회원탈퇴 등등
import { instance } from "./index.js";

// 회원가입
async function registerUser(userData) {
  try {
    return await instance.post("/signup", userData);
  } catch (error) {
    throw error.response;
  }
}

// 로그인
async function loginUser(loginData) {
  try {
    return await instance.post("/login", loginData);
  } catch (error) {
    throw error.response;
  }
}

export { registerUser, loginUser };
