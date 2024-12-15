import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogById, updateBlog } from '../../api/blogs';

const EditBlog = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: [], // Array to store content blocks
    author: '',
    tags: '',
    image: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);  // Handle loading state

  // Fetch the blog details using the ID
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const fetchedBlog = await fetchBlogById(id);
        if (fetchedBlog) {
          setBlog(fetchedBlog);  // Pre-fill form with existing data
        } else {
          alert('Blog not found!');
          navigate('/admin'); 
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        alert('Failed to fetch blog details.');
      } finally {
        setLoading(false); 
      }
    };

    loadBlog();
  }, [id, navigate]);

  // Handle changes in the main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  // Handle changes in the content blocks
  const handleContentChange = (index, field, value) => {
    const newContent = [...blog.content];
    newContent[index] = {
      ...newContent[index],
      [field]: value,
    };
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: newContent,
    }));
  };

  // Add a new content block
  const addContentBlock = () => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: [
        ...prevBlog.content,
        { title: '', text: '', image: '' },
      ],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, blog);  // Update the blog with the modified data
      alert('Blog updated successfully!');
      navigate('/admin');  
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Blog</h2>
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
      <button type="submit">Update Blog</button>
    </form>
  );
};

export default EditBlog;
