// src/components/BlogCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog, name }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div className="flex justify-between items-center gap-6 bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition">
      {/* Text Section */}
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">
          By <span className="font-medium text-gray-700">{name}</span>
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {blog.content.slice(0, 120)}...
        </p>

        <button
          onClick={handleClick}
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Read More
        </button>
      </div>

      {/* Image Section */}
      {blog.image && (
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${blog.image}`}
          alt={blog.title}
          className="w-36 h-36 object-cover rounded-lg bg-gray-100 hidden sm:block"
        />
      )}
    </div>
  );
}

export default BlogCard;
