import React from "react";
import { withRouter } from "react-router";

// css
import "./Grid.css";

// component
import GridCard from "./GridCard/GridCard";

function Grid({ items, kinds }) {
  return (
    <section className="grid">
      {items.map(item => (
        <GridCard key={item.id} item={item} kinds={kinds} />
      ))}
    </section>
  );
}

export default withRouter(Grid);
