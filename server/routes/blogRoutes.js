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


/**
 * @route   GET /api/blogs/tag/:tag
 * @desc    Fetch blogs by tag
 */
router.get("/tag/:tag", async (req, res) => {
    const { tag } = req.params; // Get the tag from URL parameter
    try {
      // Find blogs that contain the tag in the tags array
      const blogs = await Blog.find({ tags: tag });
      
      // If no blogs are found with the given tag
      if (blogs.length === 0) {
        return res.status(404).json({ message: `No blogs found with tag: ${tag}` });
      }
      
      // Return the filtered blogs
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs by tag:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  // Fetch related blogs based on tags
router.get('/blogs', async (req, res) => {
  try {
    const { tags } = req.query;
    if (!tags) {
      return res.status(400).json({ error: 'Tags are required' });
    }

    // Convert the tags query string to an array
    const tagArray = tags.split(',');

    // Find blogs that have any of the tags in common with the current blog
    const relatedBlogs = await Blog.find({
      tags: { $in: tagArray },
    }).limit(5); // Limit the number of related blogs (optional)

    return res.json(relatedBlogs);
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete a blog by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const blogId = req.params.id; // Get the blog ID from URL params

    // Attempt to find and delete the blog by ID
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // If the blog with the given ID doesn't exist
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      message: 'Server error while deleting blog',
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update a blog by ID
 */
router.put('/:id', async (req, res) => {
  try {
    const blogId = req.params.id; // Get the blog ID from URL params
    const updatedData = req.body; // Get updated data from the request body

    // Attempt to find and update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      updatedData,
      { new: true, runValidators: true } // Return the updated document and validate data
    );

    // If the blog with the given ID doesn't exist
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      message: 'Server error while updating blog',
      error: error.message,
    });
  }
});


export default router;