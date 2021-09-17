import React from "react";
import { Link } from "react-router-dom";
export default function Navbar({title}) {
  return (
    <>
    <title>{title} | Expanse Tracker App </title>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Expanse Tracker App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="btn btn-warning me-2" to="/signup">
              Signup
            </Link>
            <Link className="btn btn-primary" to="/signin">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}