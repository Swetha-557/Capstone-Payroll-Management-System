import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function Dashboard() {
  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "employee") {
        navigate("/login");
        return;
      }

      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const current = employees.find((emp) => emp.email === user.email);
      setEmployee(current || null);

      const allLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
      setLeaves(allLeaves.filter((l) => l.email === user.email));
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLeaveChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const newLeave = {
      name: user.name,
      email: user.email,
      ...leaveForm,
      status: "Pending",
    };

    const allLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    allLeaves.push(newLeave);
    localStorage.setItem("leaves", JSON.stringify(allLeaves));

    setLeaves([...leaves, newLeave]);
    setLeaveForm({ type: "", startDate: "", endDate: "", reason: "" });
    setShowLeaveForm(false);
  };

  const handleDownloadPayslip = () => {
    if (!employee) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Payroll Management System", 20, 20);
    doc.setFontSize(14);
    doc.text("Employee Payslip", 20, 40);

    doc.setFontSize(12);
    doc.text(`Name: ${employee.name}`, 20, 60);
    doc.text(`Email: ${employee.email}`, 20, 70);
    doc.text(`Department: ${employee.department}`, 20, 80);
    doc.text(`Start Date: ${employee.startDate}`, 20, 90);

    doc.text("Salary Details:", 20, 110);
    doc.text(`Base Salary: $${employee.baseSalary}`, 20, 120);
    doc.text(`Allowances: $${employee.allowances || 0}`, 20, 130);
    doc.text(`Deductions: $${employee.deductions || 0}`, 20, 140);
    doc.text(`Net Salary: $${employee.netSalary}`, 20, 150);

    doc.text("Performance:", 20, 170);
    doc.text(`Weekly: ${employee.performance?.weekly || 0}%`, 20, 180);
    doc.text(`Monthly: ${employee.performance?.monthly || 0}%`, 20, 190);
    doc.text(`Yearly: ${employee.performance?.yearly || 0}%`, 20, 200);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 220);

    doc.save(`Payslip_${employee.name}.pdf`);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">Employee Dashboard</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={handleDownloadPayslip}>
            Download Payslip
          </button>
          <button
            className="btn btn-outline-success me-2"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {employee ? (
        <>
          {/* Payroll Table */}
          <h4 className="text-success">Payroll Information</h4>
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Base Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Weekly Perf</th>
                <th>Monthly Perf</th>
                <th>Yearly Perf</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>${employee.baseSalary}</td>
                <td>${employee.allowances || 0}</td>
                <td>${employee.deductions || 0}</td>
                <td>${employee.netSalary}</td>
                <td>{employee.performance?.weekly || 0}%</td>
                <td>{employee.performance?.monthly || 0}%</td>
                <td>{employee.performance?.yearly || 0}%</td>
              </tr>
            </tbody>
          </table>

          {/* Leave Application Section */}
          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-success">Leave Applications</h4>
              <button
                className="btn btn-outline-success"
                onClick={() => setShowLeaveForm(!showLeaveForm)}
              >
                {showLeaveForm ? "✖ Close Form" : "➕ Apply Leave"}
              </button>
            </div>

            {showLeaveForm && (
              <form
                onSubmit={handleLeaveSubmit}
                className="card shadow-lg p-4 mt-3 col-md-6"
              >
                <h5 className="text-success mb-3">Apply for Leave</h5>
                <div className="mb-3">
                  <label className="form-label">Leave Type</label>
                  <select
                    name="type"
                    className="form-select"
                    value={leaveForm.type}
                    onChange={handleLeaveChange}
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Casual">Casual Leave</option>
                    <option value="Paid">Paid Leave</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">From</label>
                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={leaveForm.startDate}
                    onChange={handleLeaveChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">To</label>
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={leaveForm.endDate}
                    onChange={handleLeaveChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <textarea
                    name="reason"
                    className="form-control"
                    value={leaveForm.reason}
                    onChange={handleLeaveChange}
                    required
                  />
                </div>

                <button className="btn btn-success w-100">Submit Leave</button>
              </form>
            )}

            {/* Leave Status Table */}
            <table className="table table-bordered table-striped mt-4">
              <thead className="table-success">
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((l, idx) => (
                    <tr key={idx}>
                      <td>{l.type}</td>
                      <td>{l.startDate}</td>
                      <td>{l.endDate}</td>
                      <td>{l.reason}</td>
                      <td
                        className={
                          l.status === "Approved"
                            ? "text-success fw-bold"
                            : l.status === "Rejected"
                            ? "text-danger fw-bold"
                            : "text-warning fw-bold"
                        }
                      >
                        {l.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No leave applications yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center text-muted mt-4">
          No employee details found. Please contact Admin.
        </p>
      )}
    </div>
  );
}

export default Dashboard;
