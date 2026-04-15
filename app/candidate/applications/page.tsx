"use client";

import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role !== "candidate") {
      window.location.href = "/login";
      return;
    }

    fetch("/api/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setApps);
  }, []);

  return (
    <div className="container">
      <h2 style={{ color: "#16a34a" }}>My Applications</h2>

      {apps.map((app) => (
        <div key={app._id} className="card">
          <h3>{app.jobId?.title}</h3>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}