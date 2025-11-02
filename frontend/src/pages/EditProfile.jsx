import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("Please log in to view your profile.");
      setLoading(false);
      return;
    }

    // ✅ Fetch current user details
    axios.get("/api/auth/me", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})

      .then((res) => {
        setUser(res.data.user);
        setName(res.data.user.name);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch profile.");
        setLoading(false);
      });
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.put(
        "/api/auth/update",
        { name, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Profile updated successfully!");
      setUser({ ...user, name });
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!token) return <p>{message}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>My Profile</h2>

      {message && (
        <p
          style={{
            color: message.includes("success") ? "green" : "red",
            marginBottom: "1rem",
          }}
        >
          {message}
        </p>
      )}

      {user && (
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label>
            <input
              type="text"
              value={user.email}
              disabled
              style={{ width: "100%", padding: "0.5rem", background: "#eee" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Role:</label>
            <input
              type="text"
              value={user.role}
              disabled
              style={{ width: "100%", padding: "0.5rem", background: "#eee" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>New Password:</label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}

export default EditProfile;
