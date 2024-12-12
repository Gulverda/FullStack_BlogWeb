import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { fetchBlogs, deleteBlog } from '../api/blogs'; // Import API functions
import BlogForm from '../components/BlogForm';
import { format } from 'date-fns'; // Import format to display the creation date

const AdminPage = () => {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs on component mount
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog from the list
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  // Navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    navigate('/login'); 
    return null; 
  }

  // Helper function to extract preview text from the content
  const getPreviewText = (content) => {
    if (typeof content === 'string') {
      return content.slice(0, 150) + '...'; // Get first 150 characters for preview
    }
    return content?.[0]?.text?.slice(0, 150) + '...'; // If content is an array of objects, extract text from the first item
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <BlogForm /> 
      
      <h2>Manage Blogs</h2>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="news-card" style={{ marginBottom: "20px" }}>
            <img src={blog.image} alt={blog.title} className="news-card-image" />
            <div className="news-card-details">
              <p className="news-card-date">{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
              <h4 className="news-card-title">{blog.title}</h4>
              <p>{getPreviewText(blog.content)}</p>
              <button onClick={() => handleEdit(blog._id)}>Edit</button>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
