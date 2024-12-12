import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
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
              <Link to="/" >Home</Link>
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
        <Link to="/categories/technology">
                Technology
              </Link>
              <Link to="/categories/science">
                Science
              </Link>
              <Link to="/categories/sports">
                Sports
              </Link>
              <Link to="/categories/entertainment">
                Entertainment
              </Link>
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
