import axios from "axios";
import setInterceptors from "./common/Interceptors.js";

// axios초기화
function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const instance = createInstance();

// 회원가입
async function registerUser(userData) {
  try {
    return await instance.post("/signup", userData);
  } catch (error) {
    throw error.response;
  }
}

// 로그인
async function loginUser(loginData) {
  try {
    return await instance.post("/login", loginData);
  } catch (error) {
    throw error.response;
  }
}

// 로그인한 유저의 포스트기록 가져오기
function fetchPosts() {
  try {
    return instance.get("posts");
  } catch (error) {
    throw error.response;
  }
}

// 포스트 생성하기
function CreatePosts(postData) {
  try {
    return instance.post("posts", postData);
  } catch (error) {
    throw Error(error);
  }
}

export { registerUser, loginUser, fetchPosts, CreatePosts };
