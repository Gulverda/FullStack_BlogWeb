import React from "react";
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
            <li>Home</li>
            <li>Categories</li>
          </ul>
        </div>
        {/* <div className="footer-column">
          <h3>Headquarter</h3>
          <p>191 Middleville Road,</p>
          <p>NY 1001, Sydney</p>
          <p>Australia</p>
        </div> */}
        <div className="footer-column">
          <h3>Connections</h3>
          <div className="footer-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-behance"></i>
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
