import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Icon from '../components/Icon';
import mobileIcon from '../assets/icons/mobile.svg';
import planIcon from '../assets/icons/plan.svg';
import rechargeIcon from '../assets/icons/recharge.svg';
import loginIcon from '../assets/icons/login.svg';
import successIcon from '../assets/icons/success.svg';
import '../styles/JioHome.css';

const JioHome = () => {
  const navigate = useNavigate();

  const prepaidPlans = [
    { price: '₹49', validity: '2 Days', data: '2GB', calls: 'Unl', sms: '100 SMS' },
    { price: '₹99', validity: '28 Days', data: '1GB/day', calls: 'Unl', sms: 'Unl SMS' },
    { price: '₹199', validity: '56 Days', data: '2GB/day', calls: 'Unl', sms: 'Unl SMS' },
    { price: '₹349', validity: '84 Days', data: '3GB/day', calls: 'Unl', sms: 'Unl SMS' },
  ];

  return (
    <div className="jio-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Jio Mobile Recharge</h1>
          <p>Unlimited data, calls, and SMS at affordable prices</p>
          <Button 
            color="primary" 
            size="large" 
            shape="pill"
            onClick={() => navigate('/jio-recharge')}
          >
            Start recharge
          </Button>
        </div>
        <div className="hero-image">
          <Icon src={mobileIcon} size="120px" alt="Jio mobile" />
        </div>
      </section>

      {/* Quick Plans Section */}
      <section className="quick-plans">
        <h2>Popular Plans</h2>
        <div className="plans-container">
          {prepaidPlans.map((plan, idx) => (
            <div key={idx} className="plan-card">
              <div className="plan-price">{plan.price}</div>
              <div className="plan-validity">{plan.validity}</div>
              <div className="plan-details">
                <p>
                  <Icon src={planIcon} size="16px" alt="Data" /> {plan.data} Data
                </p>
                <p>
                  <Icon src={successIcon} size="16px" alt="Calls" /> {plan.calls} Calls
                </p>
                <p>
                  <Icon src={rechargeIcon} size="16px" alt="SMS" /> {plan.sms}
                </p>
              </div>
              <Button 
                color="secondary" 
                size="small" 
                className="btn-block"
                onClick={() => {
                  localStorage.setItem('selectedJioPlan', JSON.stringify(plan));
                  navigate('/jio-recharge');
                }}
              >
                Choose plan
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Jio?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Icon src={successIcon} size="32px" alt="Speed" />
            <h3>Ultra-fast 5G</h3>
            <p>Experience the fastest internet speeds with our 5G network.</p>
          </div>
          <div className="feature-card">
            <Icon src={planIcon} size="32px" alt="Pricing" />
            <h3>Transparent pricing</h3>
            <p>Competitive rates with unbeatable data and voice benefits.</p>
          </div>
          <div className="feature-card">
            <Icon src={mobileIcon} size="32px" alt="Coverage" />
            <h3>Always connected</h3>
            <p>Seamless connectivity across India with 4G+ coverage.</p>
          </div>
          <div className="feature-card">
            <Icon src={loginIcon} size="32px" alt="Rewards" />
            <h3>Exclusive add-ons</h3>
            <p>Entertainment bundles and premium app subscriptions included.</p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <h2>Need Help?</h2>
        <div className="support-grid">
          <Button color="primary" size="medium" shape="rounded">
            <Icon src={mobileIcon} size="16px" alt="Call" /> Customer Care
          </Button>
          <Button color="info" size="medium" shape="rounded">
            <Icon src={loginIcon} size="16px" alt="Email" /> Email Support
          </Button>
          <Button color="warning" size="medium" shape="rounded">
            <Icon src={planIcon} size="16px" alt="Chat" /> Chat Support
          </Button>
        </div>
      </section>
    </div>
  );
};

export default JioHome;
