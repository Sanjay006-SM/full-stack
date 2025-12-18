import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useRecharge } from '../context/RechargeContext';
import Icon from '../components/Icon';
import planIcon from '../assets/icons/plan.svg';
import userIcon from '../assets/icons/user.svg';
import paymentIcon from '../assets/icons/payment.svg';
import successIcon from '../assets/icons/success.svg';
import warningIcon from '../assets/icons/warning.svg';
import axios from 'axios';
import '../styles/Admin.css';

function Admin() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { plans, fetchPlans } = useRecharge();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    successRecharges: 0,
    failedRecharges: 0
  });

  // Search and Filter States
  const [userSearch, setUserSearch] = useState('');
  const [txnSearch, setTxnSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [usersRes, txnsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/users', config),
          axios.get('http://localhost:5000/api/history', config)
        ]);

        setUsers(usersRes.data);
        setTransactions(txnsRes.data);

        // Calculate stats
        const totalUsers = usersRes.data.length;
        const totalRevenue = txnsRes.data.reduce((sum, txn) => sum + (txn.amount || 0), 0);
        const successRecharges = txnsRes.data.filter(t => t.status === 'Success').length;
        const failedRecharges = txnsRes.data.filter(t => t.status === 'Failed').length;

        setStats({
          totalUsers,
          totalRevenue,
          successRecharges,
          failedRecharges
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
    fetchPlans();
  }, [fetchPlans]);

  const deletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPlans();
    } catch (err) {
      alert('Failed to delete plan');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    // Check if user is admin
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-page animate-fade">
      {/* Header */}
      <div className="admin-header animate-slide-up">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin!</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-container">
        {/* Sidebar */}
        <div className="admin-sidebar animate-slide-up stagger-1">
          <div className="sidebar-menu">
            <button
              className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Icon src={paymentIcon} size="18px" alt="Dashboard" /> Dashboard
            </button>
            <button
              className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Icon src={userIcon} size="18px" alt="Users" /> Users
            </button>
            <button
              className={`menu-item ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              <Icon src={successIcon} size="18px" alt="Transactions" /> Transactions
            </button>
            <button
              className={`menu-item ${activeTab === 'plans' ? 'active' : ''}`}
              onClick={() => setActiveTab('plans')}
            >
              <Icon src={planIcon} size="18px" alt="Plans" /> Plans
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">
          {loading ? (
            <div className="loading-state">
              <p>Loading dashboard data...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-primary">Try Again</button>
            </div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="tab-content animate-fade">
                  <h2>Dashboard Overview</h2>
                  <div className="stats-grid">
                    <div className="stat-card animate-scale stagger-1">
                      <div className="stat-icon"><Icon src={userIcon} size="24px" alt="Users" /></div>
                      <h3>Total Users</h3>
                      <p className="stat-number">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card animate-scale stagger-2">
                      <div className="stat-icon"><Icon src={paymentIcon} size="24px" alt="Revenue" /></div>
                      <h3>Total Revenue</h3>
                      <p className="stat-number">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="stat-card animate-scale stagger-3">
                      <div className="stat-icon"><Icon src={successIcon} size="24px" alt="Success" /></div>
                      <h3>Successful Recharges</h3>
                      <p className="stat-number">{stats.successRecharges}</p>
                    </div>
                    <div className="stat-card animate-scale stagger-4">
                      <div className="stat-icon"><Icon src={warningIcon} size="24px" alt="Failed" /></div>
                      <h3>Failed Recharges</h3>
                      <p className="stat-number">{stats.failedRecharges}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="tab-content animate-fade">
                  <div className="tab-header-flex">
                    <h2>User Management</h2>
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.filter(u =>
                        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase())
                      ).map(user => (
                        <tr key={user._id} className="animate-row">
                          <td>{user._id.substring(0, 8)}...</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className="status active">Active</span>
                          </td>
                          <td>
                            <button
                              className="action-btn delete"
                              onClick={() => deleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="tab-content animate-fade">
                  <div className="tab-header-flex">
                    <h2>Transaction History</h2>
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search by ID or Number..."
                        value={txnSearch}
                        onChange={(e) => setTxnSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.filter(t =>
                        t.transactionId.toLowerCase().includes(txnSearch.toLowerCase()) ||
                        t.mobileNumber.includes(txnSearch)
                      ).map(txn => (
                        <tr key={txn._id} className="animate-row">
                          <td>{txn.transactionId}</td>
                          <td>{txn.userId?.name || 'Guest'} ({txn.mobileNumber})</td>
                          <td>₹{txn.amount}</td>
                          <td>{new Date(txn.date).toLocaleDateString()}</td>
                          <td>
                            <span className={`status ${txn.status.toLowerCase()}`}>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'plans' && (
                <div className="tab-content admin-plans-tab animate-fade">
                  <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Manage Plans</h2>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/admin/add-plan')}
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      + Add New Plan
                    </button>
                  </div>

                  <div className="plans-preview-grid">
                    {plans.map(plan => (
                      <div key={plan.id} className={`admin-plan-card ${plan.operator.toLowerCase()}`}>
                        <div className="admin-plan-header">
                          <span className="plan-operator-tag">{plan.operator}</span>
                          <h3 className="plan-price">{plan.price}</h3>
                          <p className="plan-validity">{plan.validity}</p>
                        </div>
                        <div className="admin-plan-info">
                          <p><strong>Data:</strong> {plan.data}</p>
                          <p><strong>Benefits:</strong> {plan.benefits.length} items</p>
                        </div>
                        <div className="admin-plan-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate(`/admin/edit-plan/${plan.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deletePlan(plan.id)}
                            style={{ marginLeft: '8px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
