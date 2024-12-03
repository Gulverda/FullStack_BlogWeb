import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogs";
import { format } from 'date-fns';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs(); // Fetch the blogs
      setBlogs(data); // Update the blogs state
      setLoading(false); // Set loading to false once the data is fetched
    };
    getBlogs(); // Call the function to fetch blogs
  }, []);

  if (loading) return <p>Loading blogs...</p>; // Show loading message while data is being fetched
  if (blogs.length === 0) return <p>No blogs found.</p>; // If no blogs found, show this message

  const featuredBlog = blogs[0]; // First blog as featured
  const latestBlogs = blogs.slice(1); // Remaining blogs for "Latest News"

  return (
    <div className="blog-list">
      <div className="hot-topics">
        <img src={featuredBlog.image} alt={featuredBlog.title} />
        <div className="hot-topic-details">
          <h2>{featuredBlog.title}</h2>
          <p>{format(new Date(featuredBlog.createdAt), 'yyyy-MM-dd')}, {featuredBlog.author}</p>
          {/* Fixed the href using template literals */}
        </div>
        <div className="text_with_button">
        <p>{featuredBlog.content.slice(0, 300)}...</p>
        <a href={`/blogs/${featuredBlog._id}`}>Read More</a>
        </div>
      </div>

      <h3 className="section-title">Latest News</h3>
      <div className="latest-news-grid">
        {latestBlogs.map((blog) => (
          <div key={blog._id} className="news-card">
            <img src={blog.image} alt={blog.title} />
            <h4>{blog.title}</h4>
            <p>{format(new Date(blog.createdAt), 'yyyy-MM-dd')}</p>
            {/* Fixed the href using template literals */}
            <a href={`/blogs/${blog._id}`}>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;