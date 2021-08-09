import React from "react";
import { withRouter } from "react-router";

import "./MainPage.css";

function MainPage() {
  return (
    <section className="main__page">
      <h1 className="title__main">MovieSite</h1>
    </section>
  );
}

export default withRouter(MainPage);
