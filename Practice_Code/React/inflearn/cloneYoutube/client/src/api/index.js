import axios from "axios";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

// 영상전송인스턴스
const videoInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
  header: { "content-type": "multipart/form-data" },
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

// 영상만 업로드
async function apiUploadVideo(video) {
  const formData = new FormData();
  formData.append("video", video[0]);

  const { data } = await videoInstance.put("/video", formData);
  return data;
}

// 영상과 추가정보 업로드
async function apiSubmitVideo(body) {
  const { data } = await instance.post("/video", body);
  return data;
}

export { apiRegister, apiLogin, apiLogout, apiAuth, apiUploadVideo, apiSubmitVideo };
