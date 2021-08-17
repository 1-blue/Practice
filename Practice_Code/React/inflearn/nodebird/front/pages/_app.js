import React from "react";
import PropTypes from "prop-types";

import wrapper from "../store/configureStore";

import "../css/reset.css";
import "../css/common.css";
import "antd/dist/antd.css";

// 사용할 컴포넌트가 거쳐가는곳 (?)
const App = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
