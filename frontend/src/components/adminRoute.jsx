// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ modern import (v4+)

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);

    // Debug check
    // console.log("Decoded JWT:", decoded);

    if (decoded && decoded.role === "admin") {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
