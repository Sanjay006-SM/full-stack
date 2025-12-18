import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Dummy login - in real app, call API
    if (email === 'admin@airtel.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin');
      navigate('/admin');
    } else if (email && password) {
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userName', email.split('@')[0]);
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          {/* Logo */}
          <div className="login-logo">
            <span className="logo-icon">📱</span>
            <h1>Airtel Recharge</h1>
          </div>

          {/* Title */}
          <h2>Login to Your Account</h2>
          <p className="login-subtitle">Enter your credentials to continue</p>

          {/* Error Message */}
          {error && <div className="error-box">{error}</div>}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="demo-box">
            <p className="demo-title">Demo Credentials:</p>
            <div className="demo-item">
              <span className="demo-label">User:</span>
              <code>user@airtel.com</code>
            </div>
            <div className="demo-item">
              <span className="demo-label">Admin:</span>
              <code>admin@airtel.com</code>
            </div>
            <div className="demo-item">
              <span className="demo-label">Password:</span>
              <code>admin123</code>
            </div>
          </div>

          {/* Signup Link */}
          <div className="signup-link">
            <p>Don't have an account? <button type="button" className="link-btn" onClick={handleSignup}>Sign up here</button></p>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="login-info">
          <div className="info-card">
            <h3>⚡ Easy Recharge</h3>
            <p>Recharge your mobile in seconds</p>
          </div>
          <div className="info-card">
            <h3>💰 Best Prices</h3>
            <p>Get the best recharge plans</p>
          </div>
          <div className="info-card">
            <h3>🛡️ Safe & Secure</h3>
            <p>Your data is secure with us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
