import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";

import { useDispatch } from "react-redux";
import { loginUser } from "@/_actions/userAction";

import "./loginPage.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // input 변경이벤트처리
  const onChange = useCallback(e => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  }, []);

  // 로그인이벤트
  const onLogin = useCallback(async e => {
    e.preventDefault();

    // 리덕스에 로그인 정보 전달
    const response = await dispatch(loginUser({ email, password }));

    // 로그인 성공 or 실패 메시지 전송
    alert(response.payload.message);

    // 성공시 기본페이지로 이동
    if (response.payload.result) {
      props.history.push("/");
    }
  }, []);

  // 회원가입페이지로 이동
  const moveRegisterPage = useCallback(() => {
    props.history.push("/register");
  }, []);

  return (
    <section className="login__page">
      <h1 className="title">Log In</h1>
      <form onSubmit={onLogin} className="login__form">
        {/* 이메일 입력 */}
        <input type="text" name="email" placeholder="Enter your email 👈" value={email} onChange={onChange} />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password 👈"
          autoComplete="on"
          value={password}
          onChange={onChange}
        />

        {/* 로그인관련 옵션들 */}
        <section className="login__option">
          {/* 로그인유지 체크박스 */}
          <label htmlFor="remember" className="remember__label">
            <input type="checkbox" name="isRemember" id="remember" />
            Remember Me
          </label>

          {/* 비밀번호 찾기 */}
          <button type="button" className="find__password__btn">
            forgot password
          </button>
        </section>

        {/* 로그인버튼 */}
        <button type="submit">Log In</button>

        {/* 회원가입으로 이동버튼 */}
        <button type="button" className="register__btn" onClick={moveRegisterPage}>
          register now
        </button>
      </form>
    </section>
  );
}

export default withRouter(LoginPage);
