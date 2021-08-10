import React from "react";
import { withRouter } from "react-router";

// css
import "./Grid.css";

// component
import GridCard from "./GridCard/GridCard";

function Grid({ movies }) {
  return (
    <section className="grid">
      {movies.map(movie => (
        <GridCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default withRouter(Grid);
