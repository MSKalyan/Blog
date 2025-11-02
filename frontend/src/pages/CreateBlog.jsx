import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      if (image) formData.append("image", image);

      await axios.post("/api/blogs/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/myblogs");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error creating blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>✍️ Create New Blog</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            style={styles.input}
            required
          />

          <label style={styles.label}>Category *</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Technology, Travel, Food..."
            style={styles.input}
            required
          />

          <label style={styles.label}>Content *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            rows="8"
            style={styles.textarea}
            required
          ></textarea>

          <label style={styles.label}>Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.fileInput}
          />

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  formCard: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#222",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "20px",
    resize: "vertical",
  },
  fileInput: {
    display: "block",
    marginBottom: "24px",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "12px",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  error: {
    background: "#fdecea",
    color: "#d32f2f",
    padding: "10px 12px",
    borderRadius: "6px",
    marginBottom: "16px",
    textAlign: "center",
  },
};
