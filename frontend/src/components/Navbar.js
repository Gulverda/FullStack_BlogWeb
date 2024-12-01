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
      </div>
    </nav>
  );
};

export default Navbar;
