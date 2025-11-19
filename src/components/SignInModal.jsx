// src/components/SignInModal.jsx
export default function SignInModal() {
  return (
    <div className="modal fade" id="signinModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 shadow-lg border-0 overflow-hidden">
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
                 style={{ background: "linear-gradient(135deg, #2cb673, #1f8a52)" }}>
              <h2 className="fw-bold mb-3">Welcome Back</h2>
              <p className="mb-4">Sign in to plan your next adventure with Traverly.</p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ AI powered itineraries</li>
                <li className="mb-2">✔ Flexible trip adjustments</li>
                <li className="mb-2">✔ Save and access anywhere</li>
              </ul>
            </div>
            <div className="col-md-6 bg-white p-5">
              <ul className="nav nav-pills mb-4" id="signinTabs">
                <li className="nav-item w-50"><button className="nav-link active w-100" data-bs-toggle="pill" type="button">Login</button></li>
                <li className="nav-item w-50"><button className="nav-link w-100" data-bs-toggle="pill" type="button">Sign Up</button></li>
              </ul>
              <form>
                <div className="mb-3">
                  <input type="email" className="form-control rounded-3" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control rounded-3" placeholder="Password" />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small><a href="#" className="text-decoration-none" style={{ color: "#2cb673" }}>Forgot Password?</a></small>
                </div>
                <button type="submit" className="btn btn-lg w-100 text-white rounded-3"
                        style={{ background: "linear-gradient(135deg, #2cb673, #1f8a52)" }}>
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <small>Don't have an account? <a href="#" style={{ color: "#2cb673" }}>Sign Up</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
