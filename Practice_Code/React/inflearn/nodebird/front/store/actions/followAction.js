import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../types";

export function followRequest(data) {
  return {
    type: FOLLOW_REQUEST,
    data,
  };
}

export function unfollowRequest(data) {
  return {
    type: UNFOLLOW_REQUEST,
    data,
  };
}
