import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../api/blogs"; // Ensure fetchBlogs is correctly imported
import "./ScienceBlogs.css"; // Create this CSS file for custom styles

const ScienceBlogs = () => {
  const [scienceBlogs, setScienceBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs(); // Fetch the blogs
        const scienceCategoryBlogs = data
          .filter((blog) => blog.category === "science") // Filter by science category
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
        setScienceBlogs(scienceCategoryBlogs); // Update state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    getBlogs(); // Call the function to fetch blogs
  }, []);

  if (loading) return <p>Loading science news...</p>; // Display loading message
  if (scienceBlogs.length === 0) return <p>No science news available.</p>; // Handle empty blogs

  return (
    <div className="blogs-container">
      <h1>Science News</h1>
      <div className="blog-grid-science">
        {scienceBlogs.map((blog) => (
          <Link key={blog._id} to={`/blogs/${blog._id}`} className="blog-card-link">
            <div className="blog-card-science">
              <img
                src={blog.image}
                alt={blog.title}
                className="blog-card-image"
              />
              <div className="blog-card-details">
                <h2>{blog.title}</h2>
                <p>{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
                <p>{blog.author}</p>
                {/* <p>{blog.summary}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScienceBlogs;
