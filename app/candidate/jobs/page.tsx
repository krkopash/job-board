"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "candidate") {
      window.location.href = "/login";
      return;
    }

    fetch("/api/jobs")
      .then((res) => res.json())
      .then(setJobs);
  }, []);

  const apply = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/jobs/${id}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ coverLetter: "I am interested in this position." }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || "Unable to apply");
      return;
    }

    alert("Application submitted successfully");
  };

  return (
    <div className="container">
      <h2 style={{ color: "#16a34a" }}>Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} className="card">
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <button onClick={() => apply(job._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}