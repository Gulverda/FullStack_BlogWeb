import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./configuration/dbConfig.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Database Connection
connectDB();

// Routes
app.use("/api/blogs/", blogRoutes);
app.use("/api/auth", authRoutes);

// Welcome Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Blog API",
    endpoints: {
      blogs: "/api/blogs",
      auth: "/api/auth",
    },
  });
});
  
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// In your Express route
// Example for Express.js
app.get('/api/blogs/:tag', async (req, res) => {
    const { tag } = req.params; // Get the tag from the URL parameter
    
    try {
        const filteredPosts = await Blog.find({ tags: tag }); // Assuming your schema has a `tags` field
        res.json(filteredPosts);
    } catch (error) {
        console.error("Error fetching posts by tag:", error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' }); // Send a 500 error if something goes wrong
    }
});


  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
