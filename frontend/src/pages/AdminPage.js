import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { fetchBlogs, deleteBlog } from '../api/blogs'; // Import API functions
import { format } from 'date-fns'; // Import format to display the creation date
import BlogForm from '../components/BlogForm/BlogForm'; // Import the BlogForm component
import '../components/BlogList/BlogList.css';

const AdminPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

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
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Admin Panel</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Create New Post'}
        </button>
        {showForm && <BlogForm />}

      </div>
      <h2>Manage Blogs</h2>
      <div className="latest-news-grid">
        {blogs.map((blog) => (
          <div key={blog._id} className="news-card" style={{ marginBottom: "20px" }}>
            <img src={blog.image} alt={blog.title} className="news-card-image" />
            <div className="news-card-details">
              <p className="news-card-date">{format(new Date(blog.createdAt), "yyyy-MM-dd")}</p>
              <h4 className="news-card-title">{blog.title}</h4>
              <p>{getPreviewText(blog.content)}</p>
              <div className="admin_buttons">
                <button className="admin_page_button edit" onClick={() => handleEdit(blog._id)}>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                    <g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g>

                  </svg>
                </button>
                <button className="admin_page_button delete" onClick={() => handleDelete(blog._id)}>
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                    <g id="SVGRepo_iconCarrier"> <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>

                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;