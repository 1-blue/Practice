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

// 인기영화정보들 가져오기
async function fetchMovieList(language = "ko-korean", pageNumber = 1) {
  const { data } = await apiMovieInstance.get(
    `movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&page=${pageNumber}`,
  );
  return data;
}

// 특정 영화의 정보 가져오기
async function fetchMovieInfo(movieId, language = "ko") {
  const { data } = await apiMovieInstance.get(
    `movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`,
  );
  return data;
}

// 특정 영화의 배우정보 가져오기
async function fetchMovieActors(movieId, language = "ko") {
  const { data } = await apiMovieInstance.get(
    `movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`,
  );
  return data;
}

// 특정 영화의 좋아요클릭
async function clickFavoriteMovie(body) {
  const { data } = await instance.post("/favorite", body);
  return data;
}

// 특정 영화의 좋아요개수
async function fetchMovieFavoriteCount(movieId) {
  const { data } = await instance.get(`/favorite/count/${movieId}`);
  return data;
}

// 내가 좋아요 눌렀는지 체크
async function checkFavoriteMovie(body) {
  const { data } = await instance.post("/favorite/check", body);
  return data;
}

// 로그인한 유저가 좋아요 누른 영화리스트
async function fetchFavoriteMovieList(userId) {
  const { data } = await instance.get(`/favorite/${userId}`);
  return data;
}

// 특정영화 좋아요 삭제
async function deleteFavoriteMovie(userId, movieId) {
  const { data } = await instance.delete(`/favorite`, { data: { userId, movieId } });
  return data;
}

export {
  apiRegister,
  apiLogin,
  apiLogout,
  apiAuth,
  fetchMovieList,
  fetchMovieInfo,
  fetchMovieActors,
  clickFavoriteMovie,
  fetchMovieFavoriteCount,
  checkFavoriteMovie,
  fetchFavoriteMovieList,
  deleteFavoriteMovie,
};
