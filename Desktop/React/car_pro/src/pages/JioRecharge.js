import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Icon from '../components/Icon';
import mobileIcon from '../assets/icons/mobile.svg';
import rechargeIcon from '../assect/coooi.png';
import successIcon from '../assets/icons/success.svg';
import benefitsIllustration from '../assect/image copy 3.png';
import '../styles/JioRecharge.css';

const JioRecharge = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [error, setError] = useState('');

  const validateNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handleProceed = () => {
    setError('');

    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    if (!validateNumber(mobileNumber)) {
      setError('Mobile number must be 10 digits');
      return;
    }

    if (!operator) {
      setError('Please select an operator');
      return;
    }

    localStorage.setItem('jioMobileNumber', mobileNumber);
    localStorage.setItem('jioOperator', operator);
    navigate('/jio-plans');
  };

  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  return (
    <div className="jio-recharge-page">
      <div className="recharge-container">
        <div className="recharge-box">
          <div className="card-header">
            <Icon src={rechargeIcon} size="60px" alt="Recharge" />
            <div>
              <h2>Enter Mobile Number</h2>
              <p className="subtitle">Preview plans after you sign in</p>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit number"
              value={mobileNumber}
              onChange={handleNumberChange}
              maxLength="10"
            />
            <span className="char-count">{mobileNumber.length}/10</span>
          </div>

          <div className="form-group">
            <label>Select Operator</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="">-- Choose Operator --</option>
              <option value="Jio">Jio</option>
              <option value="Airtel">Airtel</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
            </select>
          </div>

          <Button
            color="primary"
            size="large"
            className="btn-block"
            onClick={handleProceed}
          >
            View Plans
          </Button>

          <Button
            color="light"
            size="large"
            className="btn-block"
            onClick={() => navigate('/jio')}
          >
            Back to Home
          </Button>
        </div>

        <div className="recharge-info">
          <div className="card-header">
            <Icon src={mobileIcon} size="24px" alt="Network" />
            <h3>OI Network Benefits</h3>
          </div>
          <ul>
            <li><Icon src={successIcon} size="16px" alt="Benefit" /> Free local & STD calls</li>
            <li><Icon src={successIcon} size="16px" alt="Benefit" /> Unlimited SMS across India</li>
            <li><Icon src={successIcon} size="16px" alt="Benefit" /> High-speed 4G+/5G data</li>
            <li><Icon src={successIcon} size="16px" alt="Benefit" /> Premium apps access</li>
            <li><Icon src={successIcon} size="16px" alt="Benefit" /> 24/7 customer support</li>
          </ul>
          <div className="benefits-image-container">
            <img src={benefitsIllustration} className="benefits-illustration" alt="Jio Benefits" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JioRecharge;
