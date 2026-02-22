import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import api from "../api/api";

function BlogList() {
  const [name, setName] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setName(userRes.data.name);

        const blogRes = await api.get("/blogs");
	// ✅ depends on backend response shape
	const blogArray = blogRes.data?.data || blogRes.data?.blogs || [];
console.log("BLOG RES:", blogRes.data);
	setBlogs(Array.isArray(blogArray) ? blogArray : []);
      }
catch (err) {
  if (err.response?.status === 401) {
    console.log("User not authenticated");
  } else {
    console.error("Error fetching blogs", err);
  }
}

    };

    fetchUserAndBlogs();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {name && <h1>Welcome, {name}</h1>}

      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} name={blog.author_name} />
        ))
      )}
    </div>
  );
}

export default BlogList;
