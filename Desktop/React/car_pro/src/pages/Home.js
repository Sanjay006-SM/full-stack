import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import imageAirtel from '../assect/image.png';
import Icon from '../components/Icon';
import mobileIcon from '../assets/icons/mobile.svg';
import successIcon from '../assets/icons/success.svg';
import paymentIcon from '../assets/icons/payment.svg';
import planIcon from '../assets/icons/plan.svg';

const Home = () => {
  const navigate = useNavigate();

  const handleRecharge = () => {
    navigate('/recharge');
  };

  return (
    <div className="home-page animate-fade">
      <div className="home-container">
        {/* Welcome Section with Image */}
        <div className="welcome-section animate-slide-up stagger-1">
          <div className="welcome-content">
            <h1>Welcome to Airtel Recharge</h1>
            <p>Quick and easy mobile recharge</p>
          </div>
          <div className="welcome-image">
            <img src={imageAirtel} alt="Airtel Services" />
          </div>
        </div>

        {/* Main Action */}
        <div className="recharge-box animate-slide-up stagger-2">
          <div className="section-title-with-icon">
            <Icon src={mobileIcon} size="32px" alt="Mobile" />
            <h2>Start Recharge</h2>
          </div>
          <p>Recharge your Airtel mobile instantly</p>
          <button onClick={handleRecharge} className="recharge-btn">
            Recharge Now
          </button>
        </div>

        {/* Info Cards */}
        <div className="info-section">
          <div className="info-card animate-scale stagger-3">
            <Icon src={successIcon} size="24px" alt="Fast" />
            <h3>Fast</h3>
            <p>Instant recharge in seconds</p>
          </div>
          <div className="info-card animate-scale stagger-4">
            <Icon src={paymentIcon} size="24px" alt="Affordable" />
            <h3>Affordable</h3>
            <p>Best prices available</p>
          </div>
          <div className="info-card animate-scale stagger-1" style={{ animationDelay: '0.5s' }}>
            <Icon src={planIcon} size="24px" alt="Safe" />
            <h3>Safe</h3>
            <p>Secure transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
