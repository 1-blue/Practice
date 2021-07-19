import React from "react";
import { Link } from "react-router-dom";

import "@/css/navbar.css";

export default function RightMenu({ visible, onClickLogout }) {
  // 로그인시
  if (visible) {
    return (
      <section className="nav__right__section">
        <li>
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
      <li>
        <Link to="/login">login</Link>
      </li>
      <li>
        <Link to="/register">register</Link>
      </li>
    </section>
  );
}
