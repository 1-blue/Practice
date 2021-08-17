import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";

// components
import NavigationBar from "../NavigationBar";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.userReducer);

  return (
    <>
      {/* 네비게이션바 */}
      <NavigationBar />

      {/* 6 : 12 : 6으로 영역구분 */}
      <Row gutter={4}>
        {/* 로그인폼 or 유저프로필 */}
        <Col xs={24} md={6}>
          {me.isLoggedIn ? <UserProfile /> : <LoginForm />}
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
