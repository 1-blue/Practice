import { LOAD_POSTS_REQUEST, ADD_POST_REQUEST, REMOVE_POST_REQUEST, ADD_COMMENT_REQUEST } from "../types";

export function loadPostRequest(data) {
  return {
    type: LOAD_POSTS_REQUEST,
    data,
  };
}

export function addPostRequest(data) {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
}
export function removePostRequest(data) {
  return {
    type: REMOVE_POST_REQUEST,
    data,
  };
}

export function addCommentRequest(data) {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
}
