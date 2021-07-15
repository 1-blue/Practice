import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
    </Router>
  );
}
