import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./configuration/dbConfig.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";

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
    console.error(err.message);
  }
};

// Connect to DB and then create Admin user
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connection
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

    // Example for Express.js
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

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`Server running on http://localhost:${PORT}`);
      }
    });
  } catch (err) {
    console.error("Error during server startup:", err.message);
  }
};

startServer();
