/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

import {
  fetchMovieInfo,
  fetchMovieActors,
  clickFavoriteMovie,
  fetchMovieFavoriteCount,
  checkFavoriteMovie,
} from "@/api";

import "./MovieDetailPage.css";

import MainImage from "@/components/common/MainImage/MainImage";
import Grid from "@/components/common/Grid/Grid";
import Comments from "@/components/common/Comments/Comments";
import MovieInfo from "./MovieInfo/MovieInfo";
import MovieFavoriteBtn from "./MovieFavoriteBtn/MovieFavoriteBtn";

function MovieDetailPage(props) {
  const [movieInfo, setMovieInfo] = useState(null);
  const [mainMovieImageUrl, setMainMovieImageUrl] = useState(null);
  const [movieActors, setMovieActors] = useState(null);
  const [toggleActor, setToggleActor] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector(state => state.userReducer.userData);
  const { movieId } = props.match.params;

  useEffect(async () => {
    // 현재 영화에 대한 정보 가져오기
    const tempMovieInfo = await fetchMovieInfo(movieId, "ko");
    setMovieInfo(tempMovieInfo);

    // 현재 영화의 메인이미지 url설정
    setMainMovieImageUrl(`${process.env.REACT_APP_API_IMAGE_URL}w1280${tempMovieInfo.backdrop_path}`);

    // 현재 영화의 배우들 가져오기
    const tempMovieActor = await fetchMovieActors(movieId, "ko");
    setMovieActors(tempMovieActor.cast);

    // 현재 영화의 좋아요 개수
    setFavoriteCount(await fetchMovieFavoriteCount(movieId));

    // 내가 좋아요 눌렀는지
    if (user) {
      setIsFavorite(await checkFavoriteMovie({ userId: user._id, movieId }));
    }
  }, [user]);

  // 영화출연배우들 토글
  const onClickToggleActor = () => {
    setToggleActor(prev => !prev);
  };

  // 영화 좋아요 클릭 ( 유저아이디, 영화아이디 전송 )
  const onClickFavoriteMovie = async () => {
    const movieTitle = movieInfo.title;
    const movieRuntime = movieInfo.runtime;
    const movieUrl = mainMovieImageUrl;

    // 좋아요 변경
    await clickFavoriteMovie({ userId: user._id, movieId, movieTitle, movieRuntime, movieUrl });

    // 변경한 좋아요 다시 패치
    setFavoriteCount(await fetchMovieFavoriteCount(movieId));

    // 내가 좋아요 눌렀는지 다시 패치
    setIsFavorite(await checkFavoriteMovie({ userId: user._id, movieId }));
  };

  return (
    <section className="movie__detail__page__container">
      {/* 현재 영화의 이미지 */}
      {movieInfo && <MainImage image={mainMovieImageUrl} title={movieInfo.title} description={movieInfo.overview} />}

      {/* 현재 영화 좋아요 버튼 */}
      {movieInfo && (
        <MovieFavoriteBtn onClickFavoriteMovie={onClickFavoriteMovie}>
          {isFavorite ? `좋아요취소 ${favoriteCount}` : `좋아요추가 ${favoriteCount}`}
        </MovieFavoriteBtn>
      )}

      {/* 현재 영화의 정보 */}
      {movieInfo && <MovieInfo movieInfo={movieInfo} />}

      {/* 현재 영화 출연배우들 토글버튼 */}
      <button type="button" className="actor__toggle__btn" onClick={onClickToggleActor}>
        <strong>toggle</strong>
      </button>

      {/* 현재 영화 출연배우들 */}
      {toggleActor && movieActors && <Grid items={movieActors} kinds="detail" />}

      {/* 댓글 */}
      <Comments movieId={movieId} />
    </section>
  );
}

export default withRouter(MovieDetailPage);
