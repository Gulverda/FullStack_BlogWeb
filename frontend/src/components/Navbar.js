import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">News<span>Portal</span></Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Panel</Link>
        <div className="dropdown">
          <span className="dropdown-toggle">Categories</span>
          <div className="dropdown-menu">
            <Link to="/categories/technology">Technology</Link>
            <Link to="/categories/science">Science</Link>
            <Link to="/categories/sports">Sports</Link>
            <Link to="/categories/entertainment">Entertainment</Link>
          </div>
        </div>
        <div className="navbar-donate">
        <button className="donate-button">Donate</button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
