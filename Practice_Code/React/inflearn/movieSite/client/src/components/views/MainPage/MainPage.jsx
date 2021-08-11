import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

// api
import { fetchMovieList } from "@/api";

// css
import "./MainPage.css";

// component
import Grid from "@/components/common/Grid/Grid";
import MainImage from "@/components/common/MainImage/MainImage";
import FetchMovieBtn from "./FetchMovieBtn/FetchMovieBtn";

let timerId = null;

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovieImageUrl, setMainMovieImageUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [language, setLanguage] = useState("ko-Korean");
  const [currentMainMovieIndex, setCurrentMainMovieIndex] = useState(0);

  // 영화 패치
  const fetchMovies = async () => {
    // movie정보들의 임시저장소
    const tempMovieArray = await fetchMovieList(language, pageNumber);

    // 패치한 movie들 저장
    setMovies(prev => [...prev, ...tempMovieArray.results]);

    // 초기메인영화이미지URL 저장
    if (movies.length === 0) {
      setMainMovieImageUrl(`${process.env.REACT_APP_API_IMAGE_URL}w1280${tempMovieArray.results[0].backdrop_path}`);
    }

    // pageNumber + 1
    setPageNumber(prev => prev + 1);
  };

  // 언어변경
  const changeLanguage = () => {
    setLanguage(prev => (prev === "en-US" ? "ko-Korean" : "en-US"));
  };

  // 초기에 영화 fetch
  useEffect(() => {
    fetchMovies();
  }, []);

  // 메인영화변경
  useEffect(() => {
    timerId = setInterval(() => {
      // 영화 fetch했을때
      if (!movies) return;

      // 현재 메인영화 인덱스 ( 끝까지돌면 처음부터 )
      setCurrentMainMovieIndex(prev => (prev + 1 === movies.length ? 0 : prev + 1));

      // 메인영화 인덱스 임시로 저장 ( set이 바로적용안되가지고 임시변수로 사용함 )
      const tempMainMovieIndex = currentMainMovieIndex + 1 === movies.length ? 0 : currentMainMovieIndex + 1;

      // 메인영화이미지URL 저장
      setMainMovieImageUrl(`${process.env.REACT_APP_API_IMAGE_URL}w1280${movies[tempMainMovieIndex].backdrop_path}`);
    }, 5000);

    // 종료시 타이머 종료
    return () => {
      clearInterval(timerId);
    };
  }, [movies, currentMainMovieIndex]);

  return (
    <section className="main__page">
      {/* 메인페이지의 메인영화의 이미지 */}
      {mainMovieImageUrl && (
        <MainImage
          image={mainMovieImageUrl}
          title={movies[currentMainMovieIndex].title}
          description={movies[currentMainMovieIndex].overview}
        />
      )}

      {/* 영화 그리드 */}
      {movies && <Grid items={movies} kinds="main" />}

      {/* 영화 추가로 패치버튼 */}
      {movies && <FetchMovieBtn fetchMovies={fetchMovies}>more</FetchMovieBtn>}

      {/* 임시배치 */}
      {/* 언어변경 */}
      <button type="button" onClick={changeLanguage}>
        changeLanguage
      </button>
    </section>
  );
}

export default withRouter(MainPage);
