import React, { useState } from "react";
import { withRouter } from "react-router";

import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/userAction";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // input 변경이벤트처리
  const onChange = e => {
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
  };

  const onSubmit = async e => {
    e.preventDefault();

    // 리덕스에 로그인 정보 전달
    const response = await dispatch(loginUser({ email, password }));

    // 로그인 성공 or 실패 메시지 전송
    alert(response.payload.message);

    // 성공시 원래 페이지로 이동
    if (response.payload.result) {
      // eslint-disable-next-line react/prop-types
      props.history.push("/");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="email" placeholder="이메일을 입력하세요" value={email} onChange={onChange} />
      <input type="text" name="password" placeholder="비밀번호를 입력하세요" value={password} onChange={onChange} />
      <button type="submit">로그인</button>
    </form>
  );
}

export default withRouter(LoginPage);
