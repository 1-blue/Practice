import { ADD_POST_REQUEST, ADD_COMMENT_REQUEST } from "../types";

export function addPostRequest(data) {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
}

export function addCommentRequest(data) {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
}
