"use client";

import { useState, useEffect } from "react";

export default function RecruiterJobs() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "recruiter") {
      window.location.href = "/login";
    }
  }, []);

  const createJob = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        location,
        salary,
        description,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || "Unable to create job");
      return;
    }

    alert("Job created successfully");
    setTitle("");
    setLocation("");
    setSalary("");
    setDescription("");
  };

  return (
    <div className="container">
      <h2 style={{ color: "#16a34a" }}>Create Job</h2>

      <input placeholder="Job Title"
        onChange={(e) => setTitle(e.target.value)}/>
      <br />
      <input placeholder="location" onChange={(e)=>setLocation(e.target.value)}/><br/>
      <input placeholder="salary" onChange={(e)=>setSalary(e.target.value)}/><br/>
      <input placeholder="description" onChange={(e)=>setDescription(e.target.value)}/><br/>

      <button onClick={createJob}>Create</button>
    </div>
  );
}