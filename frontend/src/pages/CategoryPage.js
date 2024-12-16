import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../components/BlogList/BlogList.css";
import { format } from "date-fns";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const API_URL = process.env.REACT_APP_API_URL; // Ensure this points to your backend URL

const CategoryPage = () => {
  const { category } = useParams(); // Get category name from URL
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get(`${API_URL}/blogs/category/${category}`);
        
        // Ensure response data is an array
        setBlogs(Array.isArray(response.data) ? response.data : []);
        setError(null); // Reset error state
      } catch (err) {
        console.error("Error fetching blogs:", err);
        
        // Set error based on status or generic message
        if (err.response && err.response.status === 404) {
          setError("No blogs found for this category.");
        } else {
          setError("An error occurred while fetching blogs.");
        }
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchBlogsByCategory();
  }, [category]);

  return (
    <div className="category-page" style={{ padding: "20px" }}>
      <h1>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      
      {/* Loading state */}
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : blogs.length > 0 ? (
        <div className="latest-news-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="news-card">
              <img src={blog.image} alt={blog.title} />
              <h4>{blog.title}</h4>
              <p>{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
              <Link to={`/blogs/${blog._id}`} className="read-more-link">
                Read More
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-blogs-message">No blogs available in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
