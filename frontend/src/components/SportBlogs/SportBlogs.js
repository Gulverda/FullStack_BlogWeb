import React, { useState, useEffect } from "react";
import "./SportBlogs.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../api/blogs";
// import ScienceBlogs from "../ScienceBlogs";



const SportBlogs = () => {
    const [sportsBlogs, setSportsBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getBlogs = async () => {
        try {
          const data = await fetchBlogs();
          const sportsCategoryBlogs = data
            .filter((blog) => blog.category === "sports")
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setSportsBlogs(sportsCategoryBlogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getBlogs();
    }, []);
  
    if (loading) return <p>Loading sports news...</p>;
    if (sportsBlogs.length === 0) return <p>No sports news available.</p>;
  
    return (
      <div className="blogs_cont">
        <h1>Sports News</h1>
        <div className="sports-slider">
          {sportsBlogs[0] && (
            <div className="featured-blog">
              <Link to={`/blogs/${sportsBlogs[0]._id}`}>
                <img src={sportsBlogs[0].image} alt={sportsBlogs[0].title} />
                <div className="featured-blog-details">
                  <h2>{sportsBlogs[0].title}</h2>
                  <p>{format(new Date(sportsBlogs[0].createdAt), "yyyy-MM-dd")}</p>
                </div>
              </Link>
              {/* <img src={sportsBlogs[0].image} alt={sportsBlogs[0].title} />
              <div className="featured-blog-details">
                <h2>{sportsBlogs[0].title}</h2>
                <p>{format(new Date(sportsBlogs[0].createdAt), "yyyy-MM-dd")}</p>
                <Link to={`/blogs/${sportsBlogs[0]._id}`} className="read-more-link">
                  Read More
                </Link>
              </div> */}
            </div>
          )}
          <div className="blog-grid">
            {sportsBlogs.slice(1, 4).map((blog) => (
              <div className="blog-card" key={blog._id}>
                <Link to={`/blogs/${blog._id}`} className="blog-card-link">
                <img src={blog.image} alt={blog.title} />
                <div className="blog-card-details">
                  <h3>{blog.title}</h3>
                  <p>{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
                  {/* <Link to={`/blogs/${blog._id}`} className="read-more-link">
                    Read More
                  </Link> */}
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };  

export default SportBlogs;
