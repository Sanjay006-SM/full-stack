import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Your trusted mobile recharge platform offering instant and convenient recharge services.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/recharge">Recharge</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <p>Email: support@mobilerecharge.com</p>
            <p>Phone: 1800-RECHARGE</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} MobileRecharge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
