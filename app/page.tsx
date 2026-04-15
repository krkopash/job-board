"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      window.location.href = "/login";
    } else if (role === "recruiter") {
      window.location.href = "/recruiter/dashboard";
    } else {
      window.location.href = "/candidate/jobs";
    }
  }, []);
  return <p style={{ padding: 20 }}>Redirecting...</p>;
}
