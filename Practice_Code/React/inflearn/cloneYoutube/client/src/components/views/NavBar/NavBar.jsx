import React from "react";
import { Link } from "react-router-dom";

import "@/css/navbar.css";

export default function NavBar() {
  return (
    <ul className="navigation__bar">
      {/* 네비게이션 좌측영역 */}
      <section className="nav__left__section">
        <li>
          <Link to="/">Logo</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
      </section>

      {/* 네비게이션 우측영역 */}
      <section className="nav__right__section">
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </section>
    </ul>
  );
}
