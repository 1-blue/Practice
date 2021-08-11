import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

import "./FavoritePage.css";

import { fetchFavoriteMovieList, deleteFavoriteMovie } from "@/api";

import FavoriteMovie from "./FavoriteMovie/FavoriteMovie";

function FavoritePage() {
  const user = useSelector(state => state.userReducer.userData);
  const [movies, setMovies] = useState(null);

  useEffect(async () => {
    if (!user) return;
    setMovies(await fetchFavoriteMovieList(user._id));
  }, [user]);

  // 좋아요 누른 영화 제거
  const onClickDeleteBtn = async movieId => {
    // 영화제거
    await deleteFavoriteMovie(user._id, movieId);

    // 다시 패치
    setMovies(await fetchFavoriteMovieList(user._id));
  };

  return (
    <section className="favorite__page__container">
      <h1>좋아요 누른 영화 리스트</h1>
      <ul className="favorite__movie__list__container">
        <li className="favorite__movie">
          <span>영화제목</span>
          <span>런타임</span>
          <span>좋아요제거</span>
        </li>
        {movies &&
          movies.map(movie => (
            <FavoriteMovie
              key={movie._id}
              className="favorite__movie"
              movie={movie}
              onClickDeleteBtn={onClickDeleteBtn}
            />
          ))}
      </ul>
    </section>
  );
}

export default withRouter(FavoritePage);
