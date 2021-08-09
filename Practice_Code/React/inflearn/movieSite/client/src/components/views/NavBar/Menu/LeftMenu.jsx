import React from "react";
import { Link } from "react-router-dom";

import "@/css/navbar.css";

export default function LeftMenu({ isShowMenu, onClickMenu, isShowNav }) {
  return (
    <section className="nav__left__section">
      {/* 로고 */}
      <Link to="/" className="logo">
        <i className="fas fa-video" />
      </Link>

      {/* 햄버그메뉴 */}
      {isShowMenu && (
        <button type="button" className="hamburger__menu" onClick={onClickMenu}>
          <i className="fas fa-bars" />
        </button>
      )}

      {/* 홈페이지 링크 */}
      <li>
        <Link to="/" className={isShowNav ? null : "unshow"}>
          Home
        </Link>
      </li>

      {/* 블로그페이지 링크 */}
      <li>
        <Link to="/blogs" className={isShowNav ? null : "unshow"}>
          Blogs
        </Link>
      </li>
    </section>
  );
}
