import React, { useState } from "react";
import { withRouter } from "react-router";

import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/userAction";

// eslint-disable-next-line no-unused-vars
function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // input변경 이벤트
  const onChange = e => {
    switch (e.target.name) {
      // 이름
      case "name":
        setName(e.target.value);
        break;

      // 이메일
      case "email":
        setEmail(e.target.value);
        break;

      // 비밀번호
      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };
  const onSubmitRigester = async e => {
    e.preventDefault();

    // axios로 서버에서 데이터 받고 리덕스에 저장
    const response = await dispatch(registerUser({ name, email, password }));

    // 성공 or 실패시 보여줄 메시지
    alert(response.payload.message);

    // 회원가입성공
    if (response.payload.result) {
      // eslint-disable-next-line react/prop-types
      props.history.push("/login");
    }
  };

  return (
    <form onSubmit={onSubmitRigester}>
      <input type="text" value={name} onChange={onChange} name="name" placeholder="이름을 입력하세요" />
      <input type="text" value={email} onChange={onChange} name="email" placeholder="이메일을 입력하세요" />
      <input type="text" value={password} onChange={onChange} name="password" placeholder="비밀번호를 입력하세요" />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default withRouter(RegisterPage);
