import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "@/store/actions/userAction";

export default function (SpecificComponent, option, adminRoute = null) {
  /**
   * option값
   * true : 로그인시 출압가능
   * false : 비로그인시 출입가능
   * null : 아무나 출입가능
   *
   * adminRoute값
   * true : 관리자계정
   */
  const dispatch = useDispatch();

  function AuthenticationCheck({ history }) {
    useEffect(async () => {
      const response = await dispatch(await authUser());

      // 비로그인상태 => 로그인시 입장가능 페이지
      if (!response.payload.result && option) {
        alert("로그인후에 접근해주세요");
        return history.push("/login");
      }

      // 로그인상태 => 관리자만 입장가능 페이지
      if (response.payload.result && adminRoute) {
        alert("관리자만 접근가능한 페이지입니다.");
        return history.push("/");
      }

      // 로그인상태 => 비로그인시 입장가능 페이지
      if (response.payload.result && option === false) {
        alert("로그아웃후 접근해주세요");
        return history.push("/");
      }
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
