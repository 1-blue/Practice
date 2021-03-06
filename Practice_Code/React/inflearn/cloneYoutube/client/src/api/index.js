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

// 썸네일생성
async function apiCreateThumbnail(videoName) {
  const { data } = await instance.post("/video/thumbnail", { videoName });
  return data;
}

// 모든 영상들 가져오기
async function apiFetchAllVideo() {
  const { data } = await instance.get("/video");
  return data;
}

// 특정 영상정보 가져오기
async function apiFetchVideo(videoId) {
  const { data } = await instance.get(`/video/${videoId}`);
  return data;
}

// 구독
async function apiAppendSubscribe(body) {
  const { data } = await instance.post("/subscribe", body);
  return data;
}

// 구독자 수 구하기
async function apiFetchSubscribeNumber(writerId) {
  const { data } = await instance.get(`/subscribe/${writerId}`);
  return data;
}

// 조회수 찾기
async function apiFetchViews(videoId) {
  const { data } = await instance.get(`/views/${videoId}`);
  return data;
}

// 조회수 생성
async function apiCreateViews(videoId) {
  const { data } = await instance.post("/views", { videoId });
  return data;
}

// 조회수++
async function apiAppendViews(videoId) {
  const { data } = await instance.put("/views", { videoId });
  return data;
}

// 해당 전체 영상댓글 가져오기
async function apiFetchComments(videoId) {
  const { data } = await instance.get(`/comments/${videoId}`);
  return data;
}

// 댓글추가
async function apiAppendComments(body) {
  const { data } = await instance.post("/comments", body);
  return data;
}

// 좋아요 클릭
async function apiClickLike(body) {
  const { data } = await instance.post("/like/like", body);
  return data;
}

// 싫어요 클릭
async function apiClickDislike(body) {
  const { data } = await instance.post("/like/dislike", body);
  return data;
}

// 영상의 좋아요 개수
async function apiFetchVideoLike(videoId) {
  const { data } = await instance.get(`/like/video/like/${videoId}`);
  return data;
}

// 영상의 싫어요 개수
async function apiFetchVideoDislike(videoId) {
  const { data } = await instance.get(`/like/video/dislike/${videoId}`);
  return data;
}

// 댓글의 좋아요 개수
async function apiFetchCommentsLike(commentsId) {
  const { data } = await instance.get(`/like/comments/like/${commentsId}`);
  return data;
}

// 댓글의 싫어요 개수
async function apiFetchCommentsDislike(commentsId) {
  const { data } = await instance.get(`/like/comments/dislike/${commentsId}`);
  return data;
}

export {
  apiRegister,
  apiLogin,
  apiLogout,
  apiAuth,
  apiUploadVideo,
  apiSubmitVideo,
  apiCreateThumbnail,
  apiFetchAllVideo,
  apiFetchVideo,
  apiAppendSubscribe,
  apiFetchSubscribeNumber,
  apiFetchViews,
  apiCreateViews,
  apiAppendViews,
  apiFetchComments,
  apiAppendComments,
  apiClickLike,
  apiClickDislike,
  apiFetchVideoLike,
  apiFetchVideoDislike,
  apiFetchCommentsLike,
  apiFetchCommentsDislike,
};
