import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "employee") {
      navigate("/login");
      return;
    }

    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">Available Jobs</h2>
      {jobs.length > 0 ? (
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-6 mb-3">
              <div className="card shadow-sm p-3 rounded-3">
                <h5 className="text-primary">{job.title}</h5>
                <p>{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No jobs available at the moment.</p>
      )}
    </div>
  );
}

export default EmployeeJobs;
