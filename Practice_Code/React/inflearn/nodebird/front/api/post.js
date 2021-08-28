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

export function apiAddComment(body) {
  return instance.post("/comment", body);
}
