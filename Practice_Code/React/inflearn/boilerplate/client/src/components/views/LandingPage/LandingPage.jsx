import React from "react";

import { apiTest } from "../../../api/index";

// eslint-disable-next-line no-unused-vars
export default function LandingPage(props) {
  React.useEffect(async () => {
    const data = await apiTest();

    console.log(data);
  }, []);

  return <h1>랜딩페이지</h1>;
}
