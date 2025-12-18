import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Update profile logic here
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-card">
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{currentUser.name?.[0]?.toUpperCase() || 'U'}</span>
          </div>
          <div className="profile-info">
            <h1>{currentUser.name}</h1>
            <p className="profile-email">{currentUser.email}</p>
            <p className="profile-joined">
              Joined {new Date(currentUser.loginTime).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Personal Information</h2>
            {!isEditing && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: currentUser.name,
                      email: currentUser.email,
                    });
                    setErrors({});
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{currentUser.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{currentUser.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Status</span>
                <span className="detail-value active">Active</span>
              </div>
            </div>
          )}
        </div>

        {/* Account Settings Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Account Settings</h2>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Recharge History</h3>
                <p>View your past recharges and transactions</p>
              </div>
              <button className="btn btn-outline btn-sm">View History</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Payment Methods</h3>
                <p>Manage your saved payment methods</p>
              </div>
              <button className="btn btn-outline btn-sm">Manage</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Notifications</h3>
                <p>Manage notification preferences</p>
              </div>
              <button className="btn btn-outline btn-sm">Settings</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Security</h3>
                <p>Change your password and manage security</p>
              </div>
              <button className="btn btn-outline btn-sm">Change Password</button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="profile-card danger-zone">
          <div className="card-header">
            <h2>Danger Zone</h2>
          </div>
          <div className="danger-actions">
            <button 
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button className="btn btn-danger-outline">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
