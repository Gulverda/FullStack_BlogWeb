import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlogById, fetchRelatedBlogs } from "../../api/blogs"; // Adjusted import
import "./BlogDetails.css";
import { format } from "date-fns";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true); // Ensure loading is reset for new requests
      setError(null);
      try {
        const data = await fetchBlogById(id);
        if (data) {
          setBlog(data);
          const related = await fetchRelatedBlogs(data.tags, id);
          setRelatedBlogs(related);
        } else {
          setError("Blog not found");
        }
      } catch (error) {
        setError("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]); // Refetch data when the id changes

  if (loading) return <LoadingScreen />;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>No blog found</p>;

  const { title, content, author, image, tags } = blog;

  return (
    <div className="blog-details" key={id}>
      <div className="details">
        <h1>{title}</h1>
        {image ? (
          <img src={image} alt={title} className="blog-image" />
        ) : (
          <img src="/default-image.jpg" alt="default" className="blog-image" />
        )}
        {content && content.length > 0 ? (
          content.map((contentBlock, index) => (
            <div key={index} className="content-block">
              {contentBlock.title && <h2>{contentBlock.title}</h2>}
              {contentBlock.text && <p>{contentBlock.text}</p>}
              {contentBlock.image && (
                <img src={contentBlock.image} alt={`content-${index}`} />
              )}
              {contentBlock.video && (
                <video src={contentBlock.video} controls />
              )}
            </div>
          ))
        ) : (
          <p>Content is missing</p>
        )}
        <div className="author">
          <p>
            <strong>Author:</strong> {author}
          </p>
        </div>
        {tags && tags.length > 0 && (
          <div className="tags">
            <p>
              <strong>Tags:</strong>
            </p>
            {tags.map((tag, index) => (
              <Link key={index} to={`/tag/${tag}`} className="tag-link">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      {relatedBlogs.length > 0 && (
        <div className="related-blogs">
          <h3>Related Blogs:</h3>
          <ul>
            {relatedBlogs.map((relatedBlog) => (
              <li key={relatedBlog._id}>
                <Link to={`/blogs/${relatedBlog._id}`}>
                <img src={relatedBlog.image} alt={relatedBlog.title} className="news-card-image" />
              <div className="news-card-details">
                <p className="news-card-date">{format(new Date(relatedBlog.createdAt), "yyyy-MM-dd")}</p>
                <h4 className="news-card-title">{relatedBlog.title}</h4>
                {/* <Link to={`/blogs/${relatedBlog._id}`} className="read-more-link">
                  Read More
                </Link> */}
              </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
