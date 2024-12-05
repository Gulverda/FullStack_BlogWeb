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

  // Sort blogs by createdAt in descending order (newest first)
  const sortedBlogs = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Show the first 4 blogs for Hot Topics
  const hotTopics = sortedBlogs.slice(0, 4); 

  return (
    <div className="blog-list">
      <h3 className="section-title">Hot Topics</h3>
      <div className="hot-topics-grid">
        {hotTopics.map((blog) => (
          <div key={blog._id} className="hot-topic">
            <span>{blog.category}</span>
            <img src={blog.image} alt={blog.title} className="hot-topic-image" />
            <div className="hot-topic-details">
              <h2>{blog.title}</h2>
              <p>{format(new Date(blog.createdAt), 'yyyy-MM-dd')}, {blog.author}</p>
              <p>{blog.content.slice(0, 150)}...</p>
              <a href={`/blogs/${blog._id}`} className="read-more-link">Read More</a>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Latest News</h3>
      <div className="latest-news-grid">
        {sortedBlogs.slice(4).map((blog) => (
          <div key={blog._id} className="news-card">
            <img src={blog.image} alt={blog.title} />
            <h4>{blog.title}</h4>
            <p>{format(new Date(blog.createdAt), 'yyyy-MM-dd')}</p>
            <a href={`/blogs/${blog._id}`}>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
