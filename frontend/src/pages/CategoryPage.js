import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../components/BlogList.css';
import { format } from 'date-fns';
const API_URL = process.env.REACT_APP_API_URL; // Use the environment variable

const CategoryPage = () => {
  const { category } = useParams(); // Get category from the URL
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs/category/${category}`);
        console.log(response.data); // Log to check the response structure
        // Ensure the response data is an array
        setBlogs(Array.isArray(response.data) ? response.data : []); 
        setError(null); // Reset error
      } catch (err) {
        console.error("Error fetching blogs:", err); // Log error for debugging
        if (err.response && err.response.status === 404) {
          setError("This category list is empty");
        } else {
          setError("An error occurred while fetching blogs.");
        }
      }
    };

    fetchBlogs();
  }, [category]);

  return (
    <div className="category" style={{ padding: "20px" }}>
      <h1>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      {error ? (
        <p>{error}</p> // Display error message
      ) : Array.isArray(blogs) && blogs.length > 0 ? (
        <div className="latest-news-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="news-card">
              <img src={blog.image} alt={blog.title} />
              <h4>{blog.title}</h4>
              <p>{format(new Date(blog.createdAt), 'yyyy-MM-dd')}</p>
              <Link to={`/blogs/${blog._id}`}>Read More</Link>
              </div>
          ))}
        </div>
      ) : (
        <p>{blogs.length === 0 ? 'No blogs found' : 'Loading...'}</p>
      )}
    </div>
  );
};

export default CategoryPage;
