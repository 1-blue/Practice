import React from "react";
import { withRouter } from "react-router";

import { apiLogout } from "../../../api/index";

function LandingPage(props) {
  const onClickLogout = async () => {
    const response = await apiLogout();

    alert(response.message);

    if (response.result) {
      // eslint-disable-next-line react/prop-types
      props.history.push("/login");
    }
  };

  return (
    <>
      <h1>랜딩페이지</h1>
      <button type="button" onClick={onClickLogout}>
        로그아웃
      </button>
    </>
  );
}

export default withRouter(LandingPage);
