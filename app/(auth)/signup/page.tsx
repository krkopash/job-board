"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("SIGNUP RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "#16a34a" }}>Create Account</h2>

      <input placeholder="Full Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}/>
      <br />
      <input placeholder="Email" type="email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}/>
      <br />
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}/>
      <br />

      <label>I am a:</label>
      <br />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="candidate">Job Seeker (Candidate)</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <br />
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p style={{ marginTop: 20, fontSize: 14 }}>
        Already have an account?{" "}
        <a
          href="/login"
          style={{ color: "#16a34a", textDecoration: "none", fontWeight: "bold" }}
        >
          Login here
        </a>
      </p>
    </div>
  );
}