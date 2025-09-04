import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const navigate = useNavigate();

  
  const fetchData = async () => {
    try {
      const empRes = await fetch("http://localhost:8085/api/v1");
      const empData = await empRes.json();
      setEmployees(empData);

      const leaveRes = await fetch("http://localhost:8085/api/v1");
      const leaveData = await leaveRes.json();
      setLeaves(leaveData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" });
    fetchData();
  };

  // Update leave status
  const updateLeaveStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/leaves/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Search + Filter
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "" || emp.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">Admin Dashboard</h2>
        <div>
          <button
            className="btn btn-success me-2"
            onClick={() => navigate("/admin/add")}
          >
            + Add Employee
          </button>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="HR">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Software Development">Software Development</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <h4 className="text-success">Employees</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Net Salary</th>
            <th>Weekly</th>
            <th>Monthly</th>
            <th>Yearly</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>${emp.netSalary}</td>
                <td>{emp.performance?.weekly || 0}%</td>
                <td>{emp.performance?.monthly || 0}%</td>
                <td>{emp.performance?.yearly || 0}%</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No employees found.</td></tr>
          )}
        </tbody>
      </table>

      {/* Leaves Table */}
      <h4 className="text-success mt-5">Leave Requests</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((l) => (
              <tr key={l._id}>
                <td>{l.name}</td>
                <td>{l.email}</td>
                <td>{l.type}</td>
                <td>{l.startDate}</td>
                <td>{l.endDate}</td>
                <td>{l.reason}</td>
                <td>{l.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => updateLeaveStatus(l._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => updateLeaveStatus(l._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No leave requests yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
