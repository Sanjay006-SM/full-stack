import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import Button from '../components/Button';
import Icon from '../components/Icon';
import upiIcon from '../assets/icons/upi.svg';
import cardIcon from '../assets/icons/card.svg';
import walletIcon from '../assets/icons/wallet.svg';
import paymentIcon from '../assets/icons/payment.svg';
import warningIcon from '../assets/icons/warning.svg';
import '../styles/JioPayment.css';

const JioPayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  const plan = JSON.parse(localStorage.getItem('jioSelectedPlan') || '{}');
  const mobileNumber = localStorage.getItem('jioMobileNumber') || '';

  if (!plan.id) {
    navigate('/jio-plans');
    return null;
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userId = currentUser ? currentUser.id : null;

      const operator = localStorage.getItem('jioOperator') || 'Jio';

      // Clean price string to number
      const priceString = plan.price.toString().replace(/[^0-9.]/g, '');
      const amount = parseFloat(priceString);

      const payload = {
        userId,
        mobileNumber,
        operator,
        plan,
        amount
      };

      const response = await axiosInstance.post('/history', payload);

      if (response.status === 201) {
        const { transaction } = response.data;
        localStorage.setItem('jioTransactionId', transaction.transactionId);
        navigate('/jio-success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error.response?.data?.message || error.message));
      setProcessing(false);
    }
  };

  return (
    <div className="jio-payment-page">
      <div className="payment-container">
        {/* Order Summary */}
        <div className="payment-section order-summary">
          <div className="section-title">
            <Icon src={paymentIcon} size="22px" alt="Summary" />
            <h2>Order Summary</h2>
          </div>
          <div className="summary-item">
            <span>Mobile Number</span>
            <span className="highlight">{mobileNumber}</span>
          </div>
          <div className="summary-item">
            <span>Plan</span>
            <span className="highlight">{plan.price} - {plan.validity}</span>
          </div>
          <div className="summary-item">
            <span>Data</span>
            <span>{plan.data}</span>
          </div>
          <div className="summary-item">
            <span>Calls</span>
            <span>{plan.calls}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item total">
            <span>Total Amount</span>
            <span className="price">{plan.price}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-section payment-methods">
          <div className="section-title">
            <Icon src={warningIcon} size="22px" alt="Payment" />
            <h2>Select Payment Method</h2>
          </div>

          <div className="method-group">
            <input
              type="radio"
              id="upi"
              name="payment"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="upi" className="method-label">
              <Icon src={upiIcon} size="24px" alt="UPI" />
              <div>
                <span className="method-name">UPI</span>
                <span className="description">Google Pay, PhonePe, Paytm</span>
              </div>
            </label>
          </div>

          <div className="method-group">
            <input
              type="radio"
              id="card"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="card" className="method-label">
              <Icon src={cardIcon} size="24px" alt="Card" />
              <div>
                <span className="method-name">Debit/Credit Card</span>
                <span className="description">Visa, MasterCard, RuPay</span>
              </div>
            </label>
          </div>

          <div className="method-group">
            <input
              type="radio"
              id="wallet"
              name="payment"
              value="wallet"
              checked={paymentMethod === 'wallet'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="wallet" className="method-label">
              <Icon src={walletIcon} size="24px" alt="Net banking" />
              <div>
                <span className="method-name">Net Banking</span>
                <span className="description">All major banks supported</span>
              </div>
            </label>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <Icon src={warningIcon} size="18px" alt="Secure" />
          <p>Your payment is secure and encrypted</p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button
            color="secondary"
            size="large"
            className="btn-block"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Pay ' + plan.price}
          </Button>
          <Button
            color="light"
            size="large"
            className="btn-block"
            onClick={() => navigate('/jio-plans')}
            disabled={processing}
          >
            Back to Plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JioPayment;

