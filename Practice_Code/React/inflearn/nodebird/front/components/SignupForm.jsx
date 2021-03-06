import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";

import { userSignupRequest } from "../store/actions";

const PasswordErrorTextWrapper = styled.div`
  color: red;
`;
const SignupBtnWrapper = styled(Button)`
  margin-top: 10px;
`;

function SignupForm() {
  const dispatch = useDispatch();
  const { isSignupLoading, isSignupDone, isSignupError } = useSelector(state => state.userReducer);

  // 닉네임, 아이디, 비밀번호, 비밀번호체크, 약관동의
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [termAgree, setTermAgree] = useState(false);

  // 회원가입완료시 메인페이지로 강제이동
  useEffect(() => {
    if (isSignupDone) {
      alert(isSignupDone);
      Router.push("/");
    }
  }, [isSignupDone]);

  // 회원가입완료시 메인페이지로 강제이동
  useEffect(() => {
    if (isSignupError) {
      alert(isSignupError);
    }
  }, [isSignupError]);

  // 회원가입
  const onSubmitSignup = useCallback(() => {
    // 닉네임체크
    if (nickname.length < 2) return alert("닉네임을 두자리이상 입력해야합니다.");

    // 아이디 체크
    if (id.length < 5) return alert("아이디를 다섯자리이상 입력하셔야합니다.");

    // 비밀번호 체크
    if (password.length < 4) return alert("비밀번호를 네자리이상 입력하셔야합니다.");

    // 비밀번호 불일치 체크
    if (passwordError === true) return alert("비밀번호가 서로 불일치합니다.");

    // 약관동의 체크
    if (termAgree === false) return alert("약관에 동의하셔야 회원가입을 할 수 있습니다.");

    dispatch(
      userSignupRequest({
        nickname: nickname.trim(),
        id: id.trim(),
        password: password.trim(),
      }),
    );
  }, [nickname, id, password, passwordCheck, termAgree]);

  // input변경이벤트
  const onChangeInput = useCallback(
    e => {
      const { value, name, checked } = e.target;

      switch (name) {
        case "nickname":
          setNickname(value);
          break;
        case "id":
          setId(value);
          break;
        case "password":
          setPassword(value);

          // 비밀번호와 비밀번호 체크 불일치시 경고표시하기위함
          setPasswordError(passwordCheck === value ? false : true);
          break;
        case "passwordCheck":
          setPasswordCheck(value);
          setPasswordError(password === value ? false : true);
          break;
        case "term":
          setTermAgree(checked);
          break;

        default:
          break;
      }
    },
    [password, passwordCheck],
  );

  return (
    <Form onFinish={onSubmitSignup}>
      {/* 닉네임 */}
      <Form.Item>
        <label htmlFor="signup__nickname">닉네임</label>
        <br />
        <Input type="text" name="nickname" id="signup__nickname" onChange={onChangeInput} />
        <br />
      </Form.Item>

      {/* 아이디 */}
      <Form.Item>
        <label htmlFor="signup__id">아이디</label>
        <br />
        <Input type="text" name="id" id="signup__id" onChange={onChangeInput} />
        <br />
      </Form.Item>

      {/* 비밀번호 */}
      <Form.Item>
        <label htmlFor="signup__password">비밀번호</label>
        <br />
        <Input type="password" autoComplete="false" name="password" id="signup__password" onChange={onChangeInput} />
        <br />
      </Form.Item>

      {/* 비밀번호체크 */}
      <Form.Item>
        <label htmlFor="signup__password__check">비밀번호체크</label>
        <br />
        <Input
          type="password"
          autoComplete="false"
          name="passwordCheck"
          id="signup__password__check"
          onChange={onChangeInput}
        />
      </Form.Item>

      {/* 비밀번호 불일치 경고문구 */}
      {passwordError && <PasswordErrorTextWrapper>비밀번호 불일치</PasswordErrorTextWrapper>}

      {/* 체크박스 미체크 경고문구 */}

      {/* 약관동의 */}
      <Checkbox name="term" onChange={onChangeInput}>
        약관동의
      </Checkbox>
      <br />

      {/* 회원가입버튼 */}
      <SignupBtnWrapper type="primary" htmlType="submit" loading={isSignupLoading}>
        회원가입
      </SignupBtnWrapper>
    </Form>
  );
}

export default SignupForm;
