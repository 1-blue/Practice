import axios from "axios";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

// // 인터셉터설정
// instance.interceptors.request.use(
//   config => {
//     // 스피너 on
//     console.log("on");
//     store.dispatch("spinner/SPINNER_ON");
//     return config;
//   },
//   error => {
//     // 스피너 off
//     store.dispatch("spinner/SPINNER_OFF");
//     return Promise.reject(error);
//   },
// );
// // 스피너 OFF
// instance.interceptors.response.use(
//   function (response) {
//     // 스피너 off
//     console.log("off");
//     store.dispatch("spinner/SPINNER_OFF");
//     return response;
//   },
//   function (error) {
//     // 스피너 off
//     store.dispatch("spinner/SPINNER_OFF");
//     return Promise.reject(error);
//   },
// );

// 로그인
async function apiTest() {
  const { data } = await instance.post("/test");
  return data;
}

async function apiTest2() {
  const { data } = await instance.post("/auth/login");
  return data;
}

export { apiTest, apiTest2 };
