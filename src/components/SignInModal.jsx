// src/components/SignInModal.jsx
import React from "react";

export default function SignInModal() {
  return (
    <div className="modal fade" id="signinModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 shadow-lg border-0 overflow-hidden">
          <div className="row g-0">
            {/* Left gradient panel */}
            <div
              className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
              style={{ background: "linear-gradient(135deg,#2cb673,#1f8a52)" }}
            >
              <h2 className="fw-bold mb-3">Welcome Back</h2>
              <p className="mb-4">Sign in to plan your next adventure with Traverly.</p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ AI powered itineraries</li>
                <li className="mb-2">✔ Flexible trip adjustments</li>
                <li className="mb-2">✔ Save and access anywhere</li>
              </ul>
            </div>

            {/* Right form panel */}
            <div className="col-md-6 bg-white p-5">
              <ul className="nav nav-pills mb-4" id="signinTabs" role="tablist">
                <li className="nav-item w-50" role="presentation">
                  <button className="nav-link active w-100" id="login-tab" data-bs-toggle="pill" type="button">Login</button>
                </li>
                <li className="nav-item w-50" role="presentation">
                  <button className="nav-link w-100" id="signup-tab" data-bs-toggle="pill" type="button">Sign Up</button>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <form onSubmit={(e) => { e.preventDefault(); /* add auth logic */ }}>
                    <div className="mb-3">
                      <input type="email" className="form-control rounded-3" placeholder="Email" required />
                    </div>
                    <div className="mb-3">
                      <input type="password" className="form-control rounded-3" placeholder="Password" required />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <small><a href="#" className="text-decoration-none" style={{ color: "#2cb673" }}>Forgot Password?</a></small>
                    </div>
                    <button type="submit" className="btn btn-lg w-100 text-white rounded-3" style={{ background: "linear-gradient(135deg,#2cb673,#1f8a52)" }}>
                      Login
                    </button>
                  </form>
                </div>

                <div className="tab-pane fade">
                  <form onSubmit={(e) => { e.preventDefault(); /* signup */ }}>
                    <div className="mb-3">
                      <input type="text" className="form-control rounded-3" placeholder="Full name" required />
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control rounded-3" placeholder="Email" required />
                    </div>
                    <div className="mb-3">
                      <input type="password" className="form-control rounded-3" placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn btn-lg w-100 text-white rounded-3" style={{ background: "linear-gradient(135deg,#2cb673,#1f8a52)" }}>
                      Create Account
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-center mt-3">
                <small>Or continue with</small>
                <div className="mt-2 d-flex gap-2 justify-content-center">
                  <button className="btn btn-outline-secondary btn-sm">Google</button>
                  <button className="btn btn-outline-secondary btn-sm">Facebook</button>
                </div>
              </div>
            </div>
          </div> {/* row */}
        </div>
      </div>
    </div>
  );
}
