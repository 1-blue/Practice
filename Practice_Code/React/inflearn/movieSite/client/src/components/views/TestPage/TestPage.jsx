import React from "react";
import { withRouter } from "react-router";

function TestPage() {
  return <h1>로그인시에만 접근가능한 테스트페이지</h1>;
}

export default withRouter(TestPage);
