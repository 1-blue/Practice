import React from "react";
import { withRouter } from "react-router";

// css
import "./FetchMovieBtn.css";

function FetchMovieBtn({ children, fetchMovies }) {
  return (
    <button type="button" className="fetch__movie__btn" onClick={fetchMovies}>
      <strong>{children}</strong>
    </button>
  );
}

export default withRouter(FetchMovieBtn);
