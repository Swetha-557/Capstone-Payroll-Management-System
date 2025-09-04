import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [form, setForm] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "employee") {
      navigate("/login");
      return;
    }

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const currentEmployee = employees.find((emp) => emp.email === user.email);

    setForm(currentEmployee || null);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form) return;

    let updatedEmployee = { ...form };


    if (oldPassword || newPassword || confirmPassword) {
      if (oldPassword !== form.password) {
        alert(" Old password is incorrect.");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert(" New passwords do not match.");
        return;
      }
      if (newPassword.length < 6) {
        alert(" New password must be at least 6 characters.");
        return;
      }

      updatedEmployee.password = newPassword;
    }

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updatedEmployees = employees.map((emp) =>
      emp.email === form.email ? updatedEmployee : emp
    );

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    localStorage.setItem("user", JSON.stringify({ ...updatedEmployee, role: "employee" }));

    alert(" Profile updated successfully!");
    navigate("/profile");
  };

  if (!form) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="text-success mb-4">Edit My Profile</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg rounded-4">
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
          <label className="form-label">Email (cannot edit)</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            disabled
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
        <h5 className="mt-3 text-success">Change Password</h5>
        <div className="mb-3">
          <label className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
