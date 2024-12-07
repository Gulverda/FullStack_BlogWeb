import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogs";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs(); // Fetch the blogs
      // Sort blogs by createdAt in descending order (newest first)
      const sortedBlogs = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sortedBlogs); // Update the blogs state with sorted blogs
      setLoading(false); // Set loading to false once the data is fetched
    };
    getBlogs(); // Call the function to fetch blogs
  }, []);

  if (loading) return <p>Loading blogs...</p>; // Show loading message while data is being fetched
  if (blogs.length === 0) return <p>No blogs found.</p>; // If no blogs found, show this message

  // Show the first 4 blogs for Hot Topics
  const hotTopics = blogs.slice(0, 4);

  // Show the first 8 blogs for Latest News
  const latestNews = blogs.slice(0, 8);

  const getPreviewText = (contentArray) => {
    if (!Array.isArray(contentArray)) return "No content available";

    // Combine all text fields from the content array
    const combinedText = contentArray.map((item) => item.text).join(" ");

    // Truncate to 100-120 characters and add ellipsis
    return combinedText.length > 120 ? combinedText.slice(0, 120) + "..." : combinedText;
  };

  return (
    <div className="blog-list">
      {/* Hot Topics */}
      <h3 className="section-title">Hot Topics</h3>
      <div className="hot-topics-grid">
        {hotTopics.map((blog) => (
          <div key={blog._id} className="hot-topic">
            <span>{blog.category}</span>
            <img src={blog.image} alt={blog.title} className="hot-topic-image" />
            <div className="hot-topic-details">
              <h2>{blog.title}</h2>
              <p>
                {format(new Date(blog.createdAt), "yyyy-MM-dd")}, {blog.author}
              </p>
              <p>{getPreviewText(blog.content)}...</p>
              <Link to={`/blogs/${blog._id}`} className="read-more-link">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Latest News */}
      <h3 className="section-title">Latest News</h3>
      <div className="latest-news-grid">
        {latestNews.map((blog) => (
          <div key={blog._id} className="news-card">
            <img src={blog.image} alt={blog.title} />
            <p>{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
            <h4>{blog.title}</h4>
            <p>{getPreviewText(blog.content)}</p>
            <Link to={`/blogs/${blog._id}`}>Read More</Link>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <Link to="/blogs" className="view-all-btn">View All</Link>
    </div>
  );
};

export default BlogList;
