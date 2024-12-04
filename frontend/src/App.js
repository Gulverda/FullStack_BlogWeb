import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import BlogDetails from "./components/BlogDetails";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryPage from "./pages/CategoryPage"; // New category page

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/categories/:category" element={<CategoryPage />} /> {/* New route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
