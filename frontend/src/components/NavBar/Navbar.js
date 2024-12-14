import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggles the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Closes the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Manage body overflow when the menu is open or closed
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
            <Link to="/categories/technology" onClick={closeMenu}>
              Technology
            </Link>
            <Link to="/categories/science" onClick={closeMenu}>
              Science
            </Link>
            <Link to="/categories/sports" onClick={closeMenu}>
              Sports
            </Link>
            <Link to="/categories/entertainment" onClick={closeMenu}>
              Entertainment
            </Link>
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