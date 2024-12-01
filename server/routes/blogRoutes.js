import express from 'express';
import Blog from '../models/Blog.js';
const router = express.Router();
// GET /api/blogs route to fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.json(blogs); // Return the blogs as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});
// GET /api/blogs/:id route to fetch a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Find blog by ID
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog); // Return the blog data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blog details', error: error.message });
  }
});
// POST /api/blogs route to create a new blog
router.post('/', async (req, res) => {
  const { title, content, author, tags, image } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }
  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      tags,
      image,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
});
export default router;