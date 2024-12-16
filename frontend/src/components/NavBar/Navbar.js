import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Fetch categories dynamically
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          News<span>Portal</span>
        </Link>
      </div>
      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        {/* Conditionally render Admin Panel link */}
        {isLoggedIn && (
          <Link to="/admin" onClick={closeMenu}>
            Admin Panel
          </Link>
        )}

        <div className="dropdown">
          <span className="dropdown-toggle">Categories</span>
          <div className="dropdown-menu">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  to={`/categories/${category}`}
                  key={category}
                  onClick={closeMenu}
                >
                  {category}
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* Conditional render based on login state */}
        <div className="navbar-actions">
          {isLoggedIn ? (
            <button className="donate-button" onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <button className="donate-button">Sign In</button>
            </Link>
          )}
        </div>
      </div>

      {/* Burger Menu */}
      <div
        className={`burger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
