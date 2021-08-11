import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { fetchMovieInfo, fetchMovieActors } from "@/api";

import "./MovieDetailPage.css";

import MainImage from "@/components/common/MainImage/MainImage";
import Grid from "@/components/common/Grid/Grid";
import MovieInfo from "./MovieInfo/MovieInfo";

function MovieDetailPage(props) {
  const [movieInfo, setMovieInfo] = useState(null);
  const [mainMovieImageUrl, setMainMovieImageUrl] = useState(null);
  const [movieActors, setMovieActors] = useState(null);
  const [toggleActor, setToggleActor] = useState(false);

  useEffect(async () => {
    // 현재 영화에 대한 정보 가져오기
    const tempMovieInfo = await fetchMovieInfo(props.match.params.movieId, "ko");
    setMovieInfo(tempMovieInfo);

    // 현재 영화의 메인이미지 url설정
    setMainMovieImageUrl(`${process.env.REACT_APP_API_IMAGE_URL}w1280${tempMovieInfo.backdrop_path}`);

    // 현재 영화의 배우들 가져오기
    const tempMovieActor = await fetchMovieActors(props.match.params.movieId, "ko");
    setMovieActors(tempMovieActor.cast);
  }, []);

  const onClickToggleActor = () => {
    setToggleActor(prev => !prev);
  };

  return (
    <section className="movie__detail__page__container">
      {movieInfo && <MainImage image={mainMovieImageUrl} title={movieInfo.title} description={movieInfo.overview} />}
      {movieInfo && <MovieInfo movieInfo={movieInfo} />}
      <button type="button" className="actor__toggle__btn" onClick={onClickToggleActor}>
        <strong>toggle</strong>
      </button>
      {toggleActor && movieActors && <Grid items={movieActors} kinds="detail" />}
    </section>
  );
}

export default withRouter(MovieDetailPage);
