import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import { fetchBlogById } from "../api/blogs";
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        if (data) {
          setBlog(data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    getBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>; // Show loading text if blog data is not fetched yet

  const { title, content, author, image, tags } = blog;

  return (
    <div className="blog-details">
      <h1>{title}</h1>
      {image && <img src={image} alt={title} />} {/* Show main image if available */}
      
      {/* Loop through the content array and display each block */}
      {content && content.length > 0 ? (
        content.map((contentBlock, index) => (
          <div key={index} className="content-block">
            {/* Render title if it exists */}
            {contentBlock.title && <h2>{contentBlock.title}</h2>} {/* Section title */}
            {/* Render content text (paragraphs) */}
            {contentBlock.text && <p>{contentBlock.text}</p>} {/* Paragraph text */}
            {/* Render content image if available */}
            {contentBlock.image && <img src={contentBlock.image} alt={`content-${index}`} />} 
          </div>
        ))
      ) : (
        <p>Content is missing</p> // Fallback message if no content
      )}

      <div className="author">
        <p><strong>Author:</strong> {author}</p>
      </div>

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
