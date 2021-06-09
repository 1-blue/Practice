import axios from "axios";
import setInterceptors from "./common/Interceptors.js";

// 기본 인스턴스 반환
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// axios에 인증값넣어준 인스턴스 반환
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const posts = createInstanceWithAuth("/posts");
