// 학습노트조작과 관련된 CRUD API함수파일
import { posts } from "./index.js";

// 하나의 포스트 정보 가져오기
function fetchPost(postId) {
  try {
    return posts.get(postId);
  } catch (error) {
    throw Error(error);
  }
}

// 로그인한 유저의 포스트기록 가져오기
function fetchPosts() {
  try {
    return posts.get("/");
  } catch (error) {
    throw error.response;
  }
}

// 포스트 생성하기
function createPosts(postData) {
  try {
    return posts.post("/", postData);
  } catch (error) {
    throw Error(error);
  }
}

// 포스트 삭제하기
function deletePosts(postId) {
  try {
    return posts.delete(postId);
  } catch (error) {
    throw Error(error);
  }
}

// 포스트 수정하기
function editPost(postId, postData) {
  try {
    return posts.put(postId, postData);
  } catch (error) {
    throw Error(error);
  }
}

export { fetchPosts, createPosts, deletePosts, fetchPost, editPost };
