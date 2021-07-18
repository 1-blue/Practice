import React from "react";
import { withRouter } from "react-router";

import "./homePage.css";

function LandingPage() {
  return (
    <section className="home__page">
      <h1>Home페이지</h1>
    </section>
  );
}

export default withRouter(LandingPage);
