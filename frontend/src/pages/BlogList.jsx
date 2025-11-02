import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import BlogCard from "../components/BlogCard";
function BlogList() {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [blogs, setBlogs] = useState([]);
  const isLoggedIn = localStorage.getItem("token"); 
  useEffect(() => {
    if(isLoggedIn){
      try{
        const decoded = jwtDecode(isLoggedIn);
        setName(decoded.name);
      }catch(err){
        console.error("Invalid token",err);
      }
    }
    axios.get("/api")  
      .then(res => setBlogs(res.data.blogs))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {isLoggedIn &&<h1>Welcome, {name}</h1>}
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} name={blog.author_name}/>
        ))
      )} 
    </div>
  );
}

export default BlogList;