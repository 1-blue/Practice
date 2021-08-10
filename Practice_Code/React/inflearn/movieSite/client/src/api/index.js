import axios from "axios";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const apiMovieInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 회원가입
async function apiRegister(body) {
  const { data } = await instance.post("/auth/register", body);
  return data;
}

// 로그인
async function apiLogin(body) {
  const { data } = await instance.post("/auth/login", body);
  return data;
}

// 로그아웃
async function apiLogout() {
  const { data } = await instance.get("/auth/logout");
  return data;
}

// 로그인후에 유저의 정보를 가져오기 ( 리덕스에 넣어두고 사용함 )
async function apiAuth() {
  const { data } = await instance.get("/user");
  return data;
}

// 영화 api호출
async function apiMovie(language, pageNumber) {
  const { data } = await apiMovieInstance.get(
    `movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&page=${pageNumber}`,
  );
  return data;
}

export { apiRegister, apiLogin, apiLogout, apiAuth, apiMovie };
