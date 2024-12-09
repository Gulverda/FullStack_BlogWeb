import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../components/BlogList.css'
import { format } from 'date-fns';

const CategoryPage = () => {
  const { category } = useParams(); // Get category from the URL
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/category/${category}`);
        setBlogs(response.data); // Set the blogs if found
        setError(null); // Reset error
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(err.response.data.message); // Set "This category list is empty" error
        } else {
          setError("An error occurred while fetching blogs.");
        }
      }
    };

    fetchBlogs();
  }, [category]);

  return (
    <div className="category" style={{padding: "20px"}}>
      <h1>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      {error ? (
        <p>{error}</p> // Display error message
      ) : blogs.length > 0 ? (
        <div className="latest-news-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="news-card">
            <img src={blog.image} alt={blog.title} />
            <h4>{blog.title}</h4>
            <p>{format(new Date(blog.createdAt), 'yyyy-MM-dd')}</p>
            {/* Fixed the href using template literals */}
            <a href={`/blogs/${blog._id}`}>Read More</a>
          </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Loading state
      )}
    </div>
  );
};

export default CategoryPage;
