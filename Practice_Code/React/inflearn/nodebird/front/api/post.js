import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/post",
  timeout: 1000,
  withCredentials: true,
});

// 게시글 로드
export function apiLoadPost({ page }) {
  return instance.get(`/${page}`);
}

// 게시글 업로드
export function apiAddPost(body) {
  return instance.post("/", body);
}

// 게시글 삭제
export function apiRemovePost({ PostId }) {
  return instance.delete(`/${PostId}`);
}

// 게시글에 댓글 추가
export function apiAddComment(body) {
  return instance.post("/comment", body);
}

// 게시글에 좋아요 추가
export function apiAddPostLike({ PostId }) {
  return instance.patch(`/like/${PostId}`);
}

// 게시글에 좋아요 삭제
export function apiRemovePostLike({ PostId }) {
  return instance.delete(`/like/${PostId}`);
}
