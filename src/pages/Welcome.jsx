import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-between vh-100"
      style={{
        background: "linear-gradient(to right, #e8f5e9, #ffffff)",
      }}
    >
      {/* Hero Section */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="text-center p-4">
          <h1 className="mb-4 text-success fw-bold display-4">
            Payroll Management System
          </h1>
          <p className="text-muted mb-5 fs-5">
            Manage employees, payroll, performance, and leave requests in one
            place.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-success btn-lg px-4"
              onClick={() => navigate("/login")}
            >
               Login
            </button>
            <button
              className="btn btn-outline-success btn-lg px-4"
              onClick={() => navigate("/register")}
            >
               Register
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-4">
        <div className="container text-center">
          <h4 className="mb-4 text-success">Key Features</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 h-100">
                <h5 className="text-success"> Employee Management</h5>
                <p className="text-muted">
                  Add, edit, and manage employee details with ease.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 h-100">
                <h5 className="text-success"> Payroll Tracking</h5>
                <p className="text-muted">
                  Keep track of salaries, allowances, and deductions.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 h-100">
                <h5 className="text-success"> Leave Management</h5>
                <p className="text-muted">
                  Apply, approve, and monitor employee leave requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-white border-top">
        <p className="mb-0 text-muted">
           {new Date().getFullYear()} Payroll Management System. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Welcome;
