import React, { useState } from 'react';
import axios from 'axios';
import './BlogForm.css';

const BlogForm = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: [{ title: '', text: '', image: '' }], // Added title to content blocks
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

    const newBlog = {
      ...blog,
      tags: tagsArray,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/blogs', newBlog);
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
