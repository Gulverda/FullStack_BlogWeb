import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import BlogForm from '../components/BlogForm';

const AdminPage = () => {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login'); 
    return null; 
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <BlogForm /> 
      {/* Your admin panel content here */} 
    </div>
  );
};

export default AdminPage;