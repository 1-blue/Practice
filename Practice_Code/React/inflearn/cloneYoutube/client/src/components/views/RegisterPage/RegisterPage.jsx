import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";

import { useDispatch } from "react-redux";
import { validateEmail } from "@/utils/validate";
import { registerUser } from "@/_actions/userAction";

import "./registerPage.css";

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  // 회원가입 확인
  const registerValidate = useCallback(() => {
    // 이름입력유무
    if (name.length === 0) {
      alert("이름을 입력해주세요");
      return true;
    }
    // 성입력유무
    if (lastname.length === 0) {
      alert("성을 입력해주세요");
      return true;
    }
    // 이메일입력유무
    if (!validateEmail(email)) {
      alert("이메일형식으로 입력해주세요");
      return true;
    }
    // 비밀번호 입력유무
    if (password.length === 0) {
      alert("비밀번호를 입력해주세요");
      return true;
    }

    // 비밀번호 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 불일치합니다.");
      return true;
    }

    return false;
  }, [name, lastname, email, password, confirmPassword]);

  // input변경 이벤트
  const onChange = useCallback(
    e => {
      switch (e.target.name) {
        // 이름
        case "name":
          setName(e.target.value);
          break;
        // 성
        case "lastname":
          setLastname(e.target.value);
          break;
        // 이메일
        case "email":
          setEmail(e.target.value);
          break;
        // 비밀번호
        case "password":
          setPassword(e.target.value);
          break;
        // 비밀번호확인
        case "confirmPassword":
          setConfirmPassword(e.target.value);
          break;

        default:
          break;
      }
    },
    [name, lastname, email, password, confirmPassword],
  );

  // 회원가입 이벤트
  const onRigester = useCallback(
    async e => {
      e.preventDefault();

      if (registerValidate()) return;

      // axios로 서버에서 데이터 받고 리덕스에 저장
      const response = await dispatch(registerUser({ name, lastname, email, password }));

      // 성공 or 실패시 보여줄 메시지
      alert(response.payload.message);

      // 회원가입성공
      if (response.payload.result) {
        props.history.push("/login");
      }
    },
    [name, lastname, email, password, confirmPassword],
  );

  return (
    <section className="register__page">
      <h1 className="title">Register</h1>
      <form onSubmit={onRigester} className="register__form">
        {/* 이름입력 */}
        <input type="text" value={name} onChange={onChange} name="name" placeholder="Enter your name 👈" />

        {/* 성입력 */}
        <input type="text" value={lastname} onChange={onChange} name="lastname" placeholder="Enter your last-Name 👈" />

        {/* 이메일입력 */}
        <input type="text" value={email} onChange={onChange} name="email" placeholder="Enter your email 👈" />

        {/* 비밀번호 */}
        <input
          type="password"
          value={password}
          onChange={onChange}
          name="password"
          placeholder="Enter your password 👈"
        />

        {/* 비밀번호확인 */}
        <input
          type="password"
          value={confirmPassword}
          onChange={onChange}
          name="confirmPassword"
          placeholder="Enter your confirmPassword 👈"
        />
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}

export default withRouter(RegisterPage);
