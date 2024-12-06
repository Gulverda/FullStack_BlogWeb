import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [
    {
      title: { type: String, default: '' },
      text: { type: String, default: '' },
      image: { type: String, default: '' },
    },
  ],
  
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
  image: { type: String },
  category: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;