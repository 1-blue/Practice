import axios from "axios";

export const userInstance = axios.create({
  baseURL: "http://localhost:3000/user",
  timeout: 1000,
  withCredentials: true,
});

// axios요청시 전달상태를 보는 테스트용 코드
const myRequestInterceptor = userInstance.interceptors.request.use(
  config => {
    console.log("요청보내기전 호출됨 >> ");
    console.log(config.headers);
    return config;
  },
  error => {
    console.log("오류 요청을 보내기전 호출됨");
    return Promise.reject(error);
  },
);

// 회원가입
export function apiLoadMe() {
  return userInstance.get("/");
}

// 회원가입
export function apiSignUp(body) {
  return userInstance.post("/", body);
}

// 로그인
export function apiLogIn(body) {
  return userInstance.post("/login", body);
}

// 로그아웃
export function apiLogOut(body) {
  return userInstance.post("/logout", body);
}

// 로그아웃
export function apiChangeNickname(nickname) {
  return userInstance.patch(`/nickname/${nickname}`);
}

// 팔로우
export function apiFollow(UserId) {
  return userInstance.patch(`/follow/${UserId}`);
}

// 팔로우
export function apiUnfollow(UserId) {
  return userInstance.delete(`/follow/${UserId}`);
}
