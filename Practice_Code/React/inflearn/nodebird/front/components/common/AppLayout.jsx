import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import { GithubOutlined } from "@ant-design/icons";

// components
import NavigationBar from "../NavigationBar";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";

const AppLayout = ({ children }) => {
  // 로그인 여부 판단해줄 변수
  const [isLoginIn, setIsLoginIn] = useState(false);

  return (
    <>
      {/* 네비게이션바 */}
      <NavigationBar />

      {/* 6 : 12 : 6으로 영역구분 */}
      <Row gutter={4}>
        {/* 로그인폼 or 유저프로필 */}
        <Col xs={24} md={6}>
          {isLoginIn ? <UserProfile setIsLoginIn={setIsLoginIn} /> : <LoginForm setIsLoginIn={setIsLoginIn} />}
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
