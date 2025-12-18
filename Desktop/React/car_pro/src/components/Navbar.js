import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Icon from './Icon';
import logoImage from '../assect/cat.svg';
import userIcon from '../assect/unnamed-removebg-preview.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="OI Recharge home">
          <Icon src={logoImage} size="40px" alt="OI Recharge" />
          <span className="logo-text">OI Recharge</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          {isAuthenticated && (
            <>
              {currentUser?.role !== 'admin' && (
                <li className="nav-item">
                  <Link to="/jio-recharge" className="nav-link">Recharge</Link>
                </li>
              )}
              {currentUser?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
              )}
              <li className="nav-item nav-user" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                <Icon src={userIcon} size="24px" alt="User" />
                <span className="user-name">{currentUser?.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
