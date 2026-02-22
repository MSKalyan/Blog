// frontend/src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"; // ✅ use centralized api

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ Save token for Authorization header
      localStorage.setItem("token", res.data.token);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </div>

        {/* ✅ Forgot password link */}
        <div style={{ marginBottom: "1rem", textAlign: "right" }}>
          <Link to="/forgot-password" style={{ fontSize: "0.9rem" }}>
            <u>Forgot Password?</u>
          </Link>
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>

        <br />
        <br />
        <Link to="/register">
          <u>If not registered, click here</u>
        </Link>
      </form>
    </div>
  );
}

export default Login;
