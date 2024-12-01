import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configuration/dbConfig.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app = express();
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Database Connection
connectDB();
// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);