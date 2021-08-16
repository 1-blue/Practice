import React, { useState, useCallback } from "react";
import { Form, Button } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginBtnWrapper = styled(Button)`
  margin-top: 10px;
`;

function LoginForm({ setIsLoginIn }) {
  // 아이디, 비밀번호
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인
  const onSubmitLogin = useCallback(() => {
    console.log(id);
    console.log(password);
    setIsLoginIn(true);
  }, [id, password]);

  // input변화
  const onChangeInput = useCallback(e => {
    switch (e.target.name) {
      case "id":
        setId(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  }, []);

  return (
    <LoginFormWrapper onFinish={onSubmitLogin}>
      {/* 아이디 */}
      <label htmlFor="login__id">아이디</label>
      <br />
      <input type="text" name="id" id="login__id" onChange={onChangeInput} />
      <br />

      {/* 비밀번호 */}
      <label htmlFor="login__password">비밀번호</label>
      <br />
      <input type="password" autoComplete="false" name="password" id="login__password" onChange={onChangeInput} />

      <br />

      {/* 로그인버튼 */}
      <LoginBtnWrapper type="primary" htmlType="submit" size="large">
        로그인
      </LoginBtnWrapper>

      {/* 회원가입버튼 */}
      <Button size="large">
        <a href="/signup">회원가입</a>
      </Button>
    </LoginFormWrapper>
  );
}

LoginForm.propTypes = {
  setIsLoginIn: PropTypes.func.isRequired,
};

export default LoginForm;
