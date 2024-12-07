import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { fetchBlogs } from "../api/blogs";
import { format } from "date-fns";
// import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blogs">
      <h1>All Blogs</h1>
      <div className="blogs-list latest-news-grid">
        {blogs.map((blog) => (
          <div key={blog._id} className="news-card">
          <img src={blog.image} alt={blog.title} />
          <p>{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
          <h4>{blog.title}</h4>
          <Link href={`/blogs/${blog._id}`}>Read More</Link>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;