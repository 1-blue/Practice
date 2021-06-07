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

async function registerUser(userData) {
  try {
    return await instance.post("/signup", userData);
  } catch (error) {
    throw error.response;
  }
}

async function loginUser(loginData) {
  try {
    return await instance.post("/login", loginData);
  } catch (error) {
    throw error.response;
  }
}

function fetchPosts() {
  try {
    return instance.get("posts");
  } catch (error) {
    throw error.response;
  }
}

export { registerUser, loginUser, fetchPosts };
