// src/components/BlogCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog ,name}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${blog.id}`); // navigate to BlogDetails
  };

  return (
    <div style={styles.card}>
      <div>
        <div><h6>By {name}</h6></div>
        <div><h3>{blog.title}</h3></div>
        <div><p>{blog.content.slice(0, 100)}...</p></div>
         <button onClick={handleClick} style={styles.button}>
        Read More
      </button>
      </div>
      <div>
        <img style={styles.image} src={`/${blog.image}`} alt={blog.title}  />
      </div>
     
    </div>
  );
}

const styles = {
  card: {
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
   image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    background: "#f0f0f0",
    display: "block",
  },
};

export default BlogCard;
