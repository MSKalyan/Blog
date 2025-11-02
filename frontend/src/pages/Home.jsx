import React from "react";
import {Link} from "react-router-dom";
function Home() {
    const isLoggedIn = localStorage.getItem("token");
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to MyBlog</h1>
      <p style={styles.subtitle}>
        Share your thoughts, stories, and knowledge with the world 
      </p>

      <section style={styles.preview}>
        <h2>Discover Amazing Blogs</h2>
        {isLoggedIn && 
        <Link to="/blogs" style={{ textDecoration: "none", color: "#007bff",fontWeight:"bold" }}>
          <p>Explore the latest blogs from our community</p>
        </Link>
        }
        {!isLoggedIn && 
        <p style={{fontWeight:"bold"}}>
          <Link to="/login" >Login</Link> or <Link to="/register">Register</Link> to start writing your own blogs and connect with
          others!
        </p>
        }
      </section>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
  },
  preview: {
    marginTop: "2rem",
    borderTop: "1px solid #ddd",
    paddingTop: "1.5rem",
  },
};

export default Home;
