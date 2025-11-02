import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      {/* Sidebar toggle */}
      {token && <button onClick={toggleSidebar}>☰</button>}

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 style={styles.logo}>MyBlog</h2>
      </Link>

      <div style={styles.links}>
        {token ? (
          <>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search blogs..."
              style={styles.search}
            />

            <div style={styles.rightSection}>
              {/* 👇 Show Admin Panel only for admin users */}
              {role === "admin" && (
                <Link to="/admin" style={styles.adminBtn}>
                  Admin Panel
                </Link>
              )}

              {/* Logout Button */}
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  search: {
    flex: 1,
    maxWidth: "500px",
    margin: "0 40px",
    padding: "8px 20px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#000",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoutBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  adminBtn: {
    background: "green",
    color: "#fff",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
};
