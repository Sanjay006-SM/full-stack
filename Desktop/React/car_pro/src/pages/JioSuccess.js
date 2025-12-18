import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/JioSuccess.css';

const JioSuccess = () => {
  const navigate = useNavigate();
  const transactionId = localStorage.getItem('jioTransactionId') || '';
  const mobileNumber = localStorage.getItem('jioMobileNumber') || '';
  const plan = JSON.parse(localStorage.getItem('jioSelectedPlan') || '{}');

  const handleCopyId = () => {
    navigator.clipboard.writeText(transactionId);
    alert('Transaction ID copied!');
  };

  return (
    <div className="jio-success-page">
      <div className="success-container">
        <div className="success-card">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>

          {/* Success Message */}
          <h1>Recharge Successful!</h1>
          <p className="subtitle">Your recharge has been completed successfully</p>

          {/* Transaction Details */}
          <div className="transaction-details">
            <div className="detail-item">
              <span className="label">Transaction ID</span>
              <div className="txn-id">
                <span className="id">{transactionId}</span>
                <button className="copy-btn" onClick={handleCopyId}>📋 Copy</button>
              </div>
            </div>

            <div className="detail-item">
              <span className="label">Mobile Number</span>
              <span className="value">{mobileNumber}</span>
            </div>

            <div className="detail-item">
              <span className="label">Plan Amount</span>
              <span className="value price">{plan.price}</span>
            </div>

            <div className="detail-item">
              <span className="label">Validity</span>
              <span className="value">{plan.validity}</span>
            </div>

            <div className="detail-item">
              <span className="label">Data</span>
              <span className="value">{plan.data}</span>
            </div>
          </div>

          {/* Benefits Activated */}
          <div className="benefits-activated">
            <h3>✨ Benefits Activated</h3>
            <ul>
              <li>📊 Data: {plan.data}</li>
              <li>☎️ Unlimited Calls</li>
              <li>💬 Unlimited SMS</li>
              <li>🎬 Premium Apps Access</li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h3>Next Steps</h3>
            <p>Your recharge will be active within 2 minutes</p>
            <p className="note">Keep this transaction ID for future reference</p>
          </div>

          {/* Action Buttons */}
          <div className="success-actions">
            <Button
              color="primary"
              size="large"
              className="btn-block"
              onClick={() => {
                localStorage.removeItem('jioMobileNumber');
                localStorage.removeItem('jioOperator');
                localStorage.removeItem('jioSelectedPlan');
                localStorage.removeItem('jioTransactionId');
                navigate('/jio');
              }}
            >
              Back to Home
            </Button>
            <Button
              color="secondary"
              size="large"
              className="btn-block"
              onClick={() => {
                localStorage.removeItem('jioSelectedPlan');
                navigate('/jio-recharge');
              }}
            >
              Recharge Again
            </Button>
          </div>
        </div>

        {/* Support Card */}
        <div className="support-card">
          <h3>Need Help?</h3>
          <div className="support-options">
            <Button color="info" size="medium">
              📞 Customer Care
            </Button>
            <Button color="warning" size="medium">
              💬 Chat Support
            </Button>
            <Button color="dark" size="medium">
              📧 Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JioSuccess;
