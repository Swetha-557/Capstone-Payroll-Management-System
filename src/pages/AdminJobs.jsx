import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, [navigate]);

  // ✅ Add Job
  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title.trim()) {
      alert("Job title is required!");
      return;
    }

    const updatedJobs = [...jobs, { ...newJob, id: Date.now() }];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setNewJob({ title: "", description: "" });
  };

  // ✅ Delete Job
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">Manage Jobs</h2>

      {/* Add Job Form */}
      <form
        onSubmit={handleAddJob}
        className="card p-3 mb-4 shadow-sm rounded-3"
      >
        <h5 className="mb-3 text-primary">Add New Job</h5>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Job Description"
            rows="3"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
          />
        </div>
        <button className="btn btn-success">+ Add Job</button>
      </form>

      {/* Jobs Table */}
      <h5 className="text-success">Jobs List</h5>
      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No jobs added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobs;
