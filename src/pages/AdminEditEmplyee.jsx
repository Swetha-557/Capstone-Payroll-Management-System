import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditEmployee() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees.find((emp) => emp.email === email);
    if (employee) {
      setForm(employee);
    } else {
      alert("Employee not found!");
      navigate("/admin");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const netSalary =
      Number(form.baseSalary) +
      Number(form.allowances || 0) -
      Number(form.deductions || 0);

    const updatedEmployee = {
      ...form,
      netSalary,
      performance: {
        weekly: Number(form.weekly) || 0,
        monthly: Number(form.monthly) || 0,
        yearly: Number(form.yearly) || 0,
      },
    };

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = employees.map((emp) =>
      emp.email === email ? updatedEmployee : emp
    );

    localStorage.setItem("employees", JSON.stringify(updated));
    alert("Employee updated successfully!");
    navigate("/admin");
  };

  if (!form) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="text-success mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg rounded-4">
        {/* Name */}
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

        {/* Email (readonly) */}
        <div className="mb-3">
          <label className="form-label">Email (cannot edit)</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            disabled
          />
        </div>

        {/* Address */}
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

        {/* Department */}
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

        {/* Payroll Section */}
        <h5 className="mt-3 text-success">Payroll</h5>
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

        <div className="mb-3">
          <label className="form-label">Allowances ($)</label>
          <input
            type="number"
            name="allowances"
            className="form-control"
            value={form.allowances}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deductions ($)</label>
          <input
            type="number"
            name="deductions"
            className="form-control"
            value={form.deductions}
            onChange={handleChange}
          />
        </div>

        {/* Performance Section */}
        <h5 className="mt-3 text-success">Performance (%)</h5>
        <div className="mb-3">
          <label className="form-label">Weekly</label>
          <input
            type="number"
            name="weekly"
            className="form-control"
            value={form.performance?.weekly || form.weekly || 0}
            onChange={(e) =>
              setForm({
                ...form,
                performance: { ...form.performance, weekly: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monthly</label>
          <input
            type="number"
            name="monthly"
            className="form-control"
            value={form.performance?.monthly || form.monthly || 0}
            onChange={(e) =>
              setForm({
                ...form,
                performance: { ...form.performance, monthly: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Yearly</label>
          <input
            type="number"
            name="yearly"
            className="form-control"
            value={form.performance?.yearly || form.yearly || 0}
            onChange={(e) =>
              setForm({
                ...form,
                performance: { ...form.performance, yearly: e.target.value },
              })
            }
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditEmployee;
