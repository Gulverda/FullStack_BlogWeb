// api/blogs.js
import axios from "axios";

// Base URL for your API, defaulting to localhost if not set
const API_URL = process.env.REACT_APP_API_URL;

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
    const response = await axios.get(`${API_URL}/blogs/tag/${encodedTag}`);
    return response.data; // Return the filtered posts
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
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

export const fetchRelatedBlogs = async (tags, currentBlogId) => {
  try {
    // Construct the query URL with tags and exclude the current blog ID
    const queryString = `tags=${tags.join(",")}&blogId=${currentBlogId}`;
    const response = await axios.get(`${API_URL}/blogs?${queryString}`);

    // Log the fetched data for debugging
    console.log("Related blogs fetched:", response.data);

    // Filter out blogs that do not share any tags or the current blog
    return response.data.filter(
      (blog) =>
        blog._id !== currentBlogId &&
        blog.tags.some((tag) => tags.includes(tag)) // Only include blogs with matching tags
    );
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return []; // Return an empty array in case of error
  }
};
