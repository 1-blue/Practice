/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from "react";

import { withRouter } from "react-router";

// css
import "./MainPage.css";

import ChatContainer from "./ChatContainer/ChatContainer";

function MainPage() {
  return (
    <section className="main__page">
      <h1 className="main__page__title">
        <span>채팅봇</span>
        <i className="fas fa-robot" />
      </h1>

      <ChatContainer />
    </section>
  );
}

export default withRouter(MainPage);
