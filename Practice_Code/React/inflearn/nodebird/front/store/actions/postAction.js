import { ADD_POST } from "../types";

export function addPost(data) {
  // 비동기처리

  return {
    type: ADD_POST,
    data,
  };
}
