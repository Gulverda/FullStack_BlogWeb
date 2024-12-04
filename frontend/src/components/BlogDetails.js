import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import { fetchBlogById } from "../api/blogs";
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      const data = await fetchBlogById(id);
      setBlog(data);
    };
    getBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content}</p>
      <div className="author">
        <p><strong>Author:</strong> {blog.author}</p>
      </div>
      <div className="tags">
        <p><strong>Tags:</strong></p>
        {blog.tags.map((tag, index) => (
          <Link key={index} to={`/tag/${tag}`} className="tag-link">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
