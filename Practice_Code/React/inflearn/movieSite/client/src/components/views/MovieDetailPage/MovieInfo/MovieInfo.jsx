import React from "react";
import { withRouter } from "react-router";

import "./MovieInfo.css";

function MovieInfo({ movieInfo }) {
  return (
    <ul className="movie__info__container">
      <li>
        <span>제목</span>
        <p>{movieInfo.title}</p>
      </li>
      <li>
        <span>개봉일</span>
        <p>{movieInfo.release_date}</p>
      </li>
      <li>
        <span>수익</span>
        <p>{movieInfo.revenue}</p>
      </li>
      <li>
        <span>상영시간</span>
        <p>{movieInfo.runtime}</p>
      </li>
      <li>
        <span>평점</span>
        <p>{movieInfo.vote_average}</p>
      </li>
      <li>
        <span>추천수</span>
        <p>{movieInfo.vote_count}</p>
      </li>
      <li>
        <span>상태</span>
        <p>{movieInfo.status}</p>
      </li>
      <li>
        <span>관객수</span>
        <p>{movieInfo.popularity}</p>
      </li>
    </ul>
  );
}

export default withRouter(MovieInfo);
