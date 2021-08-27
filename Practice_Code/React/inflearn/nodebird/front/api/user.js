import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/user",
  timeout: 1000,
});

// 회원가입
export function apiSignUp(body) {
  return instance.post("/", body);
}

export function apiLogIn(body) {
  return instance.post("/", body);
}

export function apiLogOut(body) {
  return axios.post("/", body);
}
