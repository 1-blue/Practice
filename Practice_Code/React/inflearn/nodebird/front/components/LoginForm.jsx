import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Input } from "antd";
import styled from "styled-components";

import { userLogin } from "../store/actions";

const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginBtnWrapper = styled(Button)`
  margin-top: 10px;
`;

function LoginForm() {
  // 아이디, 비밀번호
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // 로그인
  const onSubmitLogin = useCallback(() => {
    dispatch(userLogin({ id, password }));
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
      <section>
        <label htmlFor="login__id">아이디</label>
        <br />
        <Input type="text" name="id" id="login__id" onChange={onChangeInput} />
        <br />
      </section>

      {/* 비밀번호 */}
      <section>
        <label htmlFor="login__password">비밀번호</label>
        <br />
        <Input type="password" autoComplete="false" name="password" id="login__password" onChange={onChangeInput} />
        <br />
      </section>

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

export default LoginForm;
