// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img src="/assets/logo.png" alt="Traverly" width="36" height="36" className="me-2" />
          Traverly
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="/tripplanner.html">Trip Planner</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog.html">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/deals.html">Deals</a>
            </li>
            
            <li className="nav-item ms-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#signinModal"
            >
              Sign In
            </button>
            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
}
