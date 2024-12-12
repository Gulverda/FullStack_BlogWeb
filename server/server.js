import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./configuration/dbConfig.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";
import Blog from "./models/Blog.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Database Connection and Admin User Creation
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      const admin = new User({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123", // Use a strong password in production
        role: "admin",
      });
      await admin.save();
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Error during admin user creation:", err.message);
  }
};

// Connect to DB and then create Admin user
connectDB()
  .then(async () => {
    await createAdminUser(); // Create the admin user after DB is connected

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

    // Example for Express.js to fetch posts by tag
    app.get("/api/blogs/:tag", async (req, res) => {
      const { tag } = req.params;
      try {
        const filteredPosts = await Blog.find({ tags: tag });
        res.json(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
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

    // Serve Frontend in Production
    if (process.env.NODE_ENV === "production") {
      const __dirname = path.resolve(); // Equivalent to __dirname in CommonJS

      // Serve static files from the frontend/build directory
      app.use(express.static(path.join(__dirname, "/frontend/build")));

      // For any request that doesn't match an API route, send the React app's index.html
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
      });
      
    }

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`Server running on http://localhost:${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error("Error during server startup:", err.message);
  });
