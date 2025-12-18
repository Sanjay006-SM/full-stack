import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import mobileIcon from '../assets/icons/mobile.svg';
import rechargeIcon from '../assets/icons/recharge.svg';
import loginIcon from '../assets/icons/login.svg';
import userIcon from '../assets/icons/user.svg';
import planIcon from '../assets/icons/plan.svg';
import paymentIcon from '../assets/icons/payment.svg';
import heroImage from '../assect/image.png';
import bannerImage from '../assect/image2.png';
import '../styles/Landing.css';

const networks = [
  {
    name: 'Jio',
    description: 'High-speed data with pan-India coverage.',
    plans: ['₹199 / 28d / 1.5GB per day', '₹349 / 56d / 2GB per day'],
  },
  {
    name: 'Airtel',
    description: 'Premium voice and stable broadband-grade internet.',
    plans: ['₹179 / 28d / 2GB total', '₹449 / 56d / 1.5GB per day'],
  },
  {
    name: 'Vi',
    description: 'Value packs with weekend data rollover.',
    plans: ['₹199 / 28d / 1GB per day', '₹409 / 84d / 1GB per day'],
  },
  {
    name: 'BSNL',
    description: 'Reliable connectivity across remote locations.',
    plans: ['₹153 / 28d / 1GB per day', '₹397 / 84d / 2GB per day'],
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container animate-fade">
        <div className="nav-banner animate-slide-up">
          <img src={bannerImage} alt="Recharge offers" />
        </div>
        <section className="hero-section animate-slide-up stagger-1">
          <div className="hero-content">
            <div className="hero-badge animate-scale stagger-2">
              <Icon src={loginIcon} size="20px" alt="Secure" />
              <span>Enterprise-grade security</span>
            </div>
            <h1>Fast, secure mobile recharges built for reliability</h1>
            <p>
              Browse every major operator, compare plans at a glance, and complete a secure recharge in minutes.
            </p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => navigate('/login')}>
                <Icon src={loginIcon} size="18px" alt="Login" />
                Login to recharge
              </button>
              <button className="btn ghost" onClick={() => navigate('/signup')}>
                <Icon src={userIcon} size="18px" alt="Create account" />
                Create account
              </button>
            </div>
            <div className="hero-meta">
              <div className="meta-item">
                <Icon src={paymentIcon} size="18px" alt="Payments" />
                <span>UPI, cards, and wallets supported</span>
              </div>
              <div className="meta-item">
                <Icon src={rechargeIcon} size="18px" alt="Recharge" />
                <span>View plans before signing in</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card image-card">
              <img src={heroImage} alt="Mobile recharge illustration" className="hero-img" />
            </div>
          </div>
        </section>

        <section className="networks-section animate-slide-up stagger-3">
          <div className="section-header">
            <div>
              <p className="eyebrow">Step 1 • Explore networks</p>
              <h2>Browse operators and preview plans</h2>
              <p className="section-subtitle">
                Pick your network, review the latest plans, then sign in to recharge.
              </p>
            </div>
            <button className="btn outline" onClick={() => navigate('/jio')}>
              <Icon src={rechargeIcon} size="16px" alt="Plans" />
              View Jio experience
            </button>
          </div>
          <div className="network-grid">
            {networks.map((network, index) => (
              <div key={network.name} className={`network-card animate-scale stagger-${(index % 4) + 1}`}>
                <div className="network-card-header">
                  <Icon src={planIcon} size="24px" alt={`${network.name} icon`} />
                  <div>
                    <h3>{network.name}</h3>
                    <p>{network.description}</p>
                  </div>
                </div>
                <ul className="plan-list">
                  {network.plans.map((plan) => (
                    <li key={plan}>
                      <Icon src={rechargeIcon} size="16px" alt="Plan" />
                      <span>{plan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="steps-section">
          <p className="eyebrow">Secure 3-step flow</p>
          <h2>Built like a fintech checkout</h2>
          <div className="steps-grid">
            <div className="step-card">
              <Icon src={mobileIcon} size="32px" alt="Network" />
              <h3>1. Choose network & plan</h3>
              <p>Compare operators and select the plan that fits your usage.</p>
            </div>
            <div className="step-card">
              <Icon src={loginIcon} size="32px" alt="Login" />
              <h3>2. Sign in to continue</h3>
              <p>Authenticate securely before entering your number and details.</p>
            </div>
            <div className="step-card">
              <Icon src={paymentIcon} size="32px" alt="Recharge" />
              <h3>3. Pay & confirm</h3>
              <p>Complete payment with UPI, cards, or wallets and receive instant confirmation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
