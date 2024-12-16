import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories dynamically
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fullstack-blogweb.onrender.com/categories");
        // const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Contact the Publisher</h3>
          <p>lukagulverdashvili49@gmail.com</p>
          <p>+995 551 53 66 33</p>
        </div>
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        {/* <div className="footer-column">
          <h3>Headquarter</h3>
          <p>191 Middleville Road,</p>
          <p>NY 1001, Sydney</p>
          <p>Australia</p>
        </div> */}
        <div className="footer-column">
          <h3>Categories</h3>
          <div className="footer-categories">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link key={category} to={`/categories/${category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2024 | Luka Gulverdashvili</p>
        <a href="#subscribe">Subscribe Now</a>
      </div>
    </footer>
  );
};

export default Footer;
