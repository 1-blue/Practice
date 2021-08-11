import React from "react";
import { withRouter } from "react-router";

import "./MovieFavoriteBtn.css";

function MovieFavoriteBtn({ onClickFavoriteMovie, children }) {
  return (
    <button type="button" className="movie__favorite__btn" onClick={onClickFavoriteMovie}>
      <strong>{children}</strong>
    </button>
  );
}

export default withRouter(MovieFavoriteBtn);
