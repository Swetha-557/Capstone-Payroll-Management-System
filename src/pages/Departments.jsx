import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    // Load saved departments from localStorage
    const savedDepts = JSON.parse(localStorage.getItem("departments")) || [
      "Artificial Intelligence",
      "HR",
      "Finance",
      "Marketing",
      "Software Development",
    ];
    setDepartments(savedDepts);
  }, [navigate]);


  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDept.trim()) return alert("Enter a valid department name");

    if (departments.includes(newDept)) {
      alert("Department already exists!");
      return;
    }

    const updated = [...departments, newDept];
    setDepartments(updated);
    localStorage.setItem("departments", JSON.stringify(updated));
    setNewDept("");
  };

  
  const handleDelete = (dept) => {
    if (!window.confirm(`Delete department "${dept}"?`)) return;

    const updated = departments.filter((d) => d !== dept);
    setDepartments(updated);
    localStorage.setItem("departments", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">Manage Departments</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Add Department */}
      <form onSubmit={handleAdd} className="card p-4 shadow-sm mb-4 col-md-6">
        <h5 className="mb-3 text-success">Add New Department</h5>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter department name"
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
          />
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </div>
      </form>

      {/* Departments Table */}
      <h5 className="text-success">Departments List</h5>
      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dept, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{dept}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(dept)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No departments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;
