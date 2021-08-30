import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

// components
import NavigationBar from "../NavigationBar";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";

// antd사용시 생기는 margin, padding문제 해결하는데 사용
const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.userReducer);

  return (
    <>
      {/* antd사용시 생기는 margin, padding문제 해결 */}
      <Global />

      {/* 네비게이션바 */}
      <NavigationBar />

      {/* 6 : 12 : 6으로 영역구분 */}
      <Row gutter={4}>
        {/* 로그인폼 or 유저프로필 */}
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>

        {/* 실질적으로 화면에 보여줄 컴포넌트 */}
        <Col xs={24} md={12}>
          {children}
        </Col>

        {/* 깃헙페이지 이동링크 */}
        <Col xs={24} md={6}>
          <a href="https://github.com/1-blue/Practice" target="_blank" rel="noopenner noreferrer">
            <GithubOutlined />
          </a>
        </Col>
      </Row>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
