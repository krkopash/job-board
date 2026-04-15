"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    if (data.id) {
      localStorage.setItem("userId", data.id);
    }

    if (data.role === "recruiter") {
      window.location.href = "/recruiter/dashboard";
    } else {
      window.location.href = "/candidate/jobs";
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "#16a34a" }}>Login</h2>

      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}/>
      <br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: 20, fontSize: 14 }}>
        Don't have an account?{" "}
        <a href="/signup"
          style={{ color: "#16a34a", textDecoration: "none", fontWeight: "bold" }}
        >
          Sign up here
        </a>
      </p>
    </div>
  );
}