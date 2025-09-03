import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    department: "",
    startDate: "",
    baseSalary: "",
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("tempEmployee"));
    if (!temp) {
      navigate("/register");
      return;
    }
    setEmail(temp.email); //  show registered email
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const temp = JSON.parse(localStorage.getItem("tempEmployee"));
    if (!temp) return;

    const newEmployee = {
      ...form,
      email: temp.email,
      password: temp.password,
      allowances: 0,
      deductions: 0,
      netSalary: Number(form.baseSalary),
      performance: { weekly: 0, monthly: 0, yearly: 0 },
    };

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(newEmployee);

    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("user", JSON.stringify({ ...newEmployee, role: "employee" }));
    localStorage.removeItem("tempEmployee");

    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 col-md-6 col-lg-5 rounded-4">
        <h2 className="text-success mb-4 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* ✅ Email (readonly) */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              name="department"
              className="form-select"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Software Development">Software Development</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Base Salary ($)</label>
            <input
              type="number"
              name="baseSalary"
              className="form-control"
              value={form.baseSalary}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100">Save & Continue</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
