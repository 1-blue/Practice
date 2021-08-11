import React, { useState } from "react";
import { withRouter } from "react-router";

import "./FavoriteMovie.css";

function FavoriteMovie({ movie, className, onClickDeleteBtn }) {
  const [isShowImage, setIsShowImage] = useState(false);

  const openMovieImage = () => {
    setIsShowImage(true);
  };

  const closeMovieImage = () => {
    setIsShowImage(false);
  };

  return (
    <li className={className}>
      <span onMouseEnter={openMovieImage} onMouseLeave={closeMovieImage}>
        {movie.movieTitle}
      </span>
      <span>{movie.movieRuntime}분</span>
      <button type="button" onClick={() => onClickDeleteBtn(movie.movieId)}>
        제거
      </button>

      {isShowImage && <img src={movie.movieUrl} alt="이미지없음" className="favorite__movie__hover" />}
    </li>
  );
}

export default withRouter(FavoriteMovie);
