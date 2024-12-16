import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetching categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [API_URL]);

  // Fetching blogs based on selected category
  const fetchBlogs = async (category) => {
    try {
      const response = await axios.get(`${API_URL}/blogs/${category}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handling category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchBlogs(category);
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>
      {selectedCategory && <h2>Blogs in "{selectedCategory}"</h2>}
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
            <p>{blog.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
