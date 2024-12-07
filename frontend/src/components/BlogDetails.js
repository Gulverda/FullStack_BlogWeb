import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import { fetchBlogById } from "../api/blogs";
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        if (data) {
          setBlog(data);
        } else {
          setError("Blog not found");
        }
      } catch (error) {
        setError("Error fetching blog");
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    getBlog();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>; // Example spinner
  if (error) return <p>{error}</p>;

  if (!blog) return <p>No blog found</p>; // Handle missing blog

  const { title, content, author, image, tags } = blog;

  return (
    <div className="blog-details">
      <h1>{title}</h1>
      
      {/* Display main image with fallback */}
      {image ? (
        <img src={image} alt={title} className="blog-image" />
      ) : (
        <img src="/default-image.jpg" alt="default" className="blog-image" /> // Default image if none
      )}
      
      {/* Render blog content */}
      {content && content.length > 0 ? (
        content.map((contentBlock, index) => (
          <div key={index} className="content-block">
            {contentBlock.title && <h2>{contentBlock.title}</h2>}
            {contentBlock.text && <p>{contentBlock.text}</p>}
            {contentBlock.image && <img src={contentBlock.image} alt={`content-${index}`} />}
            {contentBlock.video && <video src={contentBlock.video} controls />} {/* Handle video if any */}
          </div>
        ))
      ) : (
        <p>Content is missing</p>
      )}

      <div className="author">
        <p><strong>Author:</strong> {author}</p>
      </div>

      {/* Render tags */}
      {tags && tags.length > 0 && (
        <div className="tags">
          <p><strong>Tags:</strong></p>
          {tags.map((tag, index) => (
            <Link key={index} to={`/tag/${tag}`} className="tag-link">
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
