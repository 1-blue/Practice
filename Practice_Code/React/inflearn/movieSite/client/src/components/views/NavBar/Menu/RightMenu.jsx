import React from "react";
import { Link } from "react-router-dom";

import "@/css/navbar.css";

export default function RightMenu({ visible, onClickLogout, isShowNav }) {
  // 로그인시
  if (visible) {
    return (
      <section className="nav__right__section">
        {/* 테스트페이지 */}
        <li className={isShowNav ? null : "unshow"}>
          <Link to="/test">test</Link>
        </li>

        {/* 로그아웃 */}
        <li className={isShowNav ? null : "unshow"}>
          <Link to="/login" onClick={onClickLogout}>
            logout
          </Link>
        </li>
      </section>
    );
  }

  // 비로그인시
  return (
    <section className="nav__right__section">
      {/* 로그인 */}
      <li className={isShowNav ? null : "unshow"}>
        <Link to="/login">login</Link>
      </li>

      {/* 회원가입 */}
      <li className={isShowNav ? null : "unshow"}>
        <Link to="/register">register</Link>
      </li>
    </section>
  );
}
