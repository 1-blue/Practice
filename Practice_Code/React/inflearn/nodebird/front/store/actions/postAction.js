import {
  LOAD_POSTS_REQUEST,
  ADD_POST_REQUEST,
  REMOVE_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  POST_LIKE_REQUEST,
  POST_UNLIKE_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  RETWEET_REQUEST,
} from "../types";

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

export function addLikeRequest(data) {
  return {
    type: POST_LIKE_REQUEST,
    data,
  };
}

export function removeLikeRequest(data) {
  return {
    type: POST_UNLIKE_REQUEST,
    data,
  };
}

export function uploadImagesRequest(data) {
  return {
    type: UPLOAD_IMAGES_REQUEST,
    data,
  };
}

export function retweetRequest(data) {
  return {
    type: RETWEET_REQUEST,
    data,
  };
}
