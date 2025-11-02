import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users first
        const userRes = await axios.get("/api/admin/adminpanel", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(userRes.data.users || []);

        // Fetch blogs separately to avoid dependency on adminPanel response
        const blogRes = await axios.get("/api/admin/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBlogs(blogRes.data.blogs || []);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Could not delete user.");
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((b) => b.id !== id));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Could not delete blog.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading admin data...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* USERS SECTION */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Manage Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map((u) => (
              <li key={u.id} className="flex justify-between items-center py-3">
                <span>
                  <b>{u.name}</b> — {u.email} ({u.role})
                </span>
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* BLOGS SECTION */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Manage Blogs</h2>
        {!blogs || blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {blogs.map((b) => (
              <li key={b.id} className="flex justify-between items-center py-3">
                <div>
                  <b>{b.title}</b> —{" "}
                  <span className="text-gray-600">by {b.author_name}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => (window.location.href = `/blogs/${b.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(b.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Admin;
