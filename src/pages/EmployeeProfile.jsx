import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "employee") {
      navigate("/login");
      return;
    }

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const currentEmployee = employees.find((emp) => emp.email === user.email);

    setEmployee(currentEmployee || null);
  }, [navigate]);

  if (!employee) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">No profile found</h3>
        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 col-md-6">
      <div className="card shadow-lg p-4 rounded-4">
        <h2 className="text-success text-center mb-4">My Profile</h2>

        {/* Personal Info */}
        <h5 className="text-dark mb-3">Personal Information</h5>
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Name:</strong> {employee.name}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {employee.email}
          </li>
          <li className="list-group-item">
            <strong>Department:</strong> {employee.department}
          </li>
          <li className="list-group-item">
            <strong>Start Date:</strong> {employee.startDate}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> {employee.address}
          </li>
        </ul>

        {/* Payroll Info */}
        <h5 className="text-dark mb-3">Payroll Information</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Base Salary:</strong> ${employee.baseSalary}
          </li>
          <li className="list-group-item">
            <strong>Allowances:</strong> ${employee.allowances || 0}
          </li>
          <li className="list-group-item">
            <strong>Deductions:</strong> ${employee.deductions || 0}
          </li>
          <li className="list-group-item">
            <strong>Net Salary:</strong> ${employee.netSalary}
          </li>
        </ul>

        <div className="mt-4 d-flex gap-2">
          <button
            className="btn btn-primary w-50"
            onClick={() => navigate("/edit-profile")}
          >
            Edit My Profile
          </button>
          <button
            className="btn btn-success w-50"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
