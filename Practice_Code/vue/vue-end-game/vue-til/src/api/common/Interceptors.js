import store from "@/store/index.js";

export default function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = store.state.token; // 여기안됨
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  return instance;
}
