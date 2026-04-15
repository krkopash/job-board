"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (role !== "recruiter" || !id || !token) {
      window.location.href = "/login";
      return;
    }

    loadJobs(id, token);
  }, []);

  const loadJobs = async (id: string, token: string) => {
    const res = await fetch("/api/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      alert("Unable to load jobs");
      return;
    }

    const data = await res.json();
    setJobs(data.filter((job: any) => job.recruiterId === id));
  };

  const loadApplicants = async (jobId: string, title: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/jobs/${jobId}/applicants`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Unable to load applicants");
      return;
    }

    const data = await res.json();
    setSelectedJobTitle(title);
    setApps(data);
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Unable to update status");
      return;
    }

    alert("Application status updated");
    if (selectedJobTitle) {
      const selectedJob = jobs.find((job) => job.title === selectedJobTitle);
      if (selectedJob) {
        loadApplicants(selectedJob._id, selectedJob.title);
      }
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "#16a34a" }}>Applicants</h2>

      <button onClick={() => loadApplicants(prompt("Enter Job ID") || "")}>
        Load Applicants
      </button>

      {apps.map((app) => (
        <div key={app._id} className="card">
          <p>{app.candidateId?.email}</p>
          <p>Status: {app.status}</p>

          <button onClick={() => updateStatus(app._id, "shortlisted")}>
            Shortlist
          </button>

          <button onClick={() => updateStatus(app._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}