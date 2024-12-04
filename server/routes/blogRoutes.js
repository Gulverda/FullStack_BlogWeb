import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

/**
 * @route   GET /api/blogs
 * @desc    Fetch all blogs
 */
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.json(blogs); // Return blogs as JSON
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/blogs/:id
 * @desc    Fetch a single blog by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Find blog by ID
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog); // Return blog data
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching blog details',
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog
 */
router.post('/', async (req, res) => {
  const { title, content, author, tags, image, category } = req.body;

  // Validate required fields
  if (!title || !content || !author || !category) {
    return res.status(400).json({
      message: 'Title, content, author, and category are required',
    });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      tags,
      image,
      category,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating blog',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/blogs/category/:category
 * @desc    Fetch blogs by category
 */
router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    try {
      const blogs = await Blog.find({ category: category });
      if (blogs.length === 0) {
        return res.status(404).json({ message: "This category list is empty" });
      }
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
