import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { jwtDecode } from "jwt-decode";
function MyBlogs() {
  const [name,setName]=useState();
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
console.log(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return;
      try{
        const decoded = jwtDecode(token);
        setName(decoded.name);
      }catch(err){
        console.error("Invalid token",err);
      }
    
    axios.get("/api/blogs/myblogs", {
      headers: { Authorization: `Bearer ${token}` }
    })
    
      .then(res => setBlogs(res.data.blogs))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Please log in to see your blogs.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Blogs</h2>
      <button onClick={() => window.location.href="/create"} style={{ marginBottom: "1rem" }}>
        + Add New Blog
      </button>
      {!blogs || blogs.length === 0 ? (
        <p>You have not created any blogs yet.</p>
      ) : (
        blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} name ={name} showActions={true} />
        ))
      )}
    </div>
  );
}

export default MyBlogs;
