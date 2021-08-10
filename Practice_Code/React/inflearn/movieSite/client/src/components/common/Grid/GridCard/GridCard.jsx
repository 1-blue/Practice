import React from "react";
import { withRouter } from "react-router";

// css
import "./GridCard.css";

function GridCard({ movie }) {
  return (
    <section className="grid__card">
      <a href={`#${movie.id}`}>
        <img
          src={`${process.env.REACT_APP_API_IMAGE_URL}w500${movie.poster_path}`}
          alt="포스터 존재하지 않음"
          className="movie__image"
        />
      </a>
    </section>
  );
}

export default withRouter(GridCard);
