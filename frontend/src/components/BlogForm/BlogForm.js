import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogForm.css';

const BlogForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [blog, setBlog] = useState({
    title: '',
    content: [{ title: '', text: '', image: '' }],
    author: '',
    tags: '',
    image: '',
    category: '', // Holds the selected category
  });

  const [categories, setCategories] = useState([]); // Stores existing categories
  const [newCategory, setNewCategory] = useState(''); // Holds new category input

  // Fetch existing categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/categories");
        const response = await axios.get("https://fullstack-blogweb.onrender.com//categories");
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [API_URL]);

  // Handle category addition
  const handleAddCategory = async () => {
    if (newCategory && !categories.includes(newCategory)) {
      try {
        const response = await axios.post(`${API_URL}/api/categories`, {
          category: newCategory,
        });
        setCategories(response.data.categories); // Update the category list after adding
        setNewCategory(''); // Clear the input field
      } catch (error) {
        console.error('Error adding category:', error);
      }
    } else {
      alert('Category already exists or is invalid');
    }
  };

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...blog.content];
    updatedContent[index][field] = value;
    setBlog({
      ...blog,
      content: updatedContent,
    });
  };

  const addContentBlock = () => {
    setBlog({
      ...blog,
      content: [...blog.content, { title: '', text: '', image: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = blog.tags.split(',').map((tag) => tag.trim());

    // Use the new category if provided, otherwise use the selected category
    const selectedCategory = newCategory ? newCategory : blog.category;

    const newBlog = {
      ...blog,
      tags: tagsArray,
      category: selectedCategory,
    };

    try {
      const response = await axios.post(`${API_URL}/blogs`, newBlog);
      console.log('Blog created:', response.data);

      // Reset form fields
      setBlog({
        title: '',
        content: [{ title: '', text: '', image: '' }],
        author: '',
        tags: '',
        image: '',
        category: '',
      });
      setNewCategory('');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Blog</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Content Blocks:</label>
        {blog.content.map((block, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div>
              <label>Content Title:</label>
              <input
                type="text"
                value={block.title}
                onChange={(e) =>
                  handleContentChange(index, 'title', e.target.value)
                }
              />
            </div>
            <div>
              <label>Text:</label>
              <textarea
                value={block.text}
                onChange={(e) =>
                  handleContentChange(index, 'text', e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={block.image}
                onChange={(e) =>
                  handleContentChange(index, 'image', e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addContentBlock}>
          Add Content Block
        </button>
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={blog.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input
          type="text"
          name="tags"
          value={blog.tags}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={blog.category}
          onChange={handleChange}
        >
          <option value="">Select a Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Or Add a New Category:</label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default BlogForm;
