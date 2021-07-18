import React from "react";
import { withRouter } from "react-router";

import "./blogsPage.css";

function LandingPage() {
  return (
    <section className="blogs__page">
      <h1>Blogs페이지</h1>
    </section>
  );
}

export default withRouter(LandingPage);
