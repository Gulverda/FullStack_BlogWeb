import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../api/blogs";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./BlogList.css";
import SportBlogs from "../SportBlogs/SportBlogs";
import ScienceBlogs from "../ScienceBlog/ScienceBlogs";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs();
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) return <LoadingScreen />;
  if (blogs.length === 0) return <p>No blogs found.</p>;

  const hotTopics = blogs
    .filter((blog) => blog.tags.includes("hot-topic"))
    .slice(0, 4);
  const latestNews = blogs.slice(0, 8);

  const getPreviewText = (contentArray) => {
    if (!Array.isArray(contentArray)) return "No content available";
    const combinedText = contentArray.map((item) => item.text).join(" ");
    return combinedText.length > 120
      ? `${combinedText.slice(0, 120)}...`
      : combinedText;
  };

  return (
    <div className="blog-list">
      {/* Hot Topics Section */}
      <section className="hot-topics">
        <h1 className="section-title">Hot Topics</h1>
        <div className="hot-topics-grid">
          {hotTopics.map((blog) => (
            <div key={blog._id} className="hot-topic">
              <Link to={`/blogs/${blog._id}`} className="hot-topic-link">
                <span className="hot-topic-category">{blog.category}</span>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="hot-topic-image"
                />
                <div className="hot-topic-details">
                  <h2>{blog.title}</h2>
                  <p>
                    {format(new Date(blog.createdAt), "yyyy-MM-dd")},{" "}
                    {blog.author}
                  </p>
                  <p>{getPreviewText(blog.content)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="latest-news">
        <div className="latest-news-header">
          <h1 className="section-title">Latest News</h1>
          <Link to="/blogs" className="view-all-btn">
            View All
          </Link>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, 
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="latest-news-grid"
        >
          {latestNews.map((blog) => (
            <SwiperSlide key={blog._id} className="news-card">
              <img
                src={blog.image}
                alt={blog.title}
                className="news-card-image"
              />
              <div className="news-card-details">
                <p className="news-card-date">
                  {format(new Date(blog.createdAt), "yyyy-MM-dd")}
                </p>
                <h4 className="news-card-title">{blog.title}</h4>
                <p>{getPreviewText(blog.content)}</p>
                <Link to={`/blogs/${blog._id}`} className="read-more-link">
                  Read More
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Sports and Science News Section */}
      <section className="sports-science-news">
        <SportBlogs />
        <ScienceBlogs />
      </section>
    </div>
  );
};

export default BlogList;
