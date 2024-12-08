import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }

    // Cleanup function to reset overflow on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          News<span>Portal</span>
        </Link>
      </div>
      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/admin" onClick={closeMenu}>Admin Panel</Link>
        <div className="dropdown">
          <span className="dropdown-toggle">Categories</span>
          <div className="dropdown-menu">
            <Link to="/categories/technology" onClick={closeMenu}>Technology</Link>
            <Link to="/categories/science" onClick={closeMenu}>Science</Link>
            <Link to="/categories/sports" onClick={closeMenu}>Sports</Link>
            <Link to="/categories/entertainment" onClick={closeMenu}>Entertainment</Link>
          </div>
        </div>
        <div className="navbar-donate">
          <button className="donate-button">Donate</button>
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
