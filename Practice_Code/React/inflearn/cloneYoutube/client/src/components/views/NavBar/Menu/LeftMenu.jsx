import React from "react";
import { Link } from "react-router-dom";

import "@/css/navbar.css";

export default function LeftMenu() {
  return (
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
  );
}
