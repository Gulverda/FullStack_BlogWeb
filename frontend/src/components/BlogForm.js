import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    image: '',
    category: '',
  });

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert tags into an array
    const tagsArray = blog.tags.split(',').map((tag) => tag.trim());

    const newBlog = {
      title: blog.title,
      content: blog.content,
      author: blog.author,
      tags: tagsArray,
      image: blog.image,
      category: blog.category,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/blogs', newBlog);
      console.log('Blog created:', response.data);

      // Reset form fields
      setBlog({
        title: '',
        content: '',
        author: '',
        tags: '',
        image: '',
        category: '', 
      });
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
        <label>Content:</label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="category"
          value={blog.category}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default BlogForm;