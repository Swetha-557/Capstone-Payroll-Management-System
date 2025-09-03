import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    //  Validate passwords
    if (form.password !== form.retypePassword) {
      setError("Passwords do not match!");
      return;
    }

    // Directly go to employee form page (no localStorage)
    navigate("/employee-form", { state: { ...form } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 col-md-4 rounded-4">
        <h2 className="text-center text-success mb-3">
          Payroll Management System
        </h2>
        <h4 className="text-center text-dark mb-4">Employee Registration</h4>

        {/* Show errors */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Retype Password</label>
            <input
              type="password"
              name="retypePassword"
              className="form-control"
              placeholder="Re-enter password"
              value={form.retypePassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100 mb-3">Register</button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-none fw-bold text-success"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
