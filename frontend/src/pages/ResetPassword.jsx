import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!token) {
      setError("Reset token missing or invalid link.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });

      setMsg(res.data?.message || "Password reset successful");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "2rem auto" }}>
      <h2>Reset Password</h2>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleReset}>
        <div style={{ marginBottom: "1rem" }}>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.5rem 1rem", width: "100%" }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <br />

      <Link to="/login">
        <u>Back to Login</u>
      </Link>
    </div>
  );
}
