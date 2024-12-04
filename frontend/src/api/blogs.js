// api/blogs.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Base URL for your API

export const fetchBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const fetchBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return response.data;
};

// Fetch all posts by a specific tag
export const fetchPostsByTag = async (tag) => {
    try {
      // URL encode the tag in case it has spaces or special characters
      const encodedTag = encodeURIComponent(tag);
      const response = await axios.get(`http://localhost:5000/api/blogs/tag/${encodedTag}`);
      return response.data; // Return the filtered posts
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      throw error; // Handle error in the component
    }
  };
  

export const createBlog = async (blogData) => {
  const response = await axios.post(`${API_URL}/blogs`, blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/blogs/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/blogs/${id}`);
  return response.data;
};
