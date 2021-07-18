import axios from "axios";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

// 회원가입
async function apiRegister(body) {
  const { data } = await instance.post("/auth/register", body);
  return data;
}

// 로그인
async function apiLogin(body) {
  const { data } = await instance.post("/auth/login", body);
  return data;
}

// 로그아웃
async function apiLogout() {
  const { data } = await instance.get("/auth/logout");
  return data;
}

// 인증처리
async function apiAuth() {
  const { data } = await instance.get("/user");
  return data;
}

export { apiRegister, apiLogin, apiLogout, apiAuth };
