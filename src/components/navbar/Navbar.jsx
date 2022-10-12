import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar page-padding">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="page-1">Page 1</Link>
          </li>
          <li>
            <Link to="page-2">Page 2</Link>
          </li>
        </ul>
        {/* <SearchBar />
        <Account /> */}
      </nav>
    </>
  );
}

export default Navbar;
