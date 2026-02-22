import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.data?.message || "Reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Forgot Password</h2>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleForgot}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Send Reset Link
        </button>
      </form>

      <br />
      <Link to="/login">
        <u>Back to Login</u>
      </Link>
    </div>
  );
}
