import React, { useState } from 'react';
import Icon from '../components/Icon';
import mobileIcon from '../assets/icons/mobile.svg';
import rechargeIcon from '../assets/icons/recharge.svg';
import warningIcon from '../assets/icons/warning.svg';
import userHeroImage from '../assect/image copy 2.png';
import '../styles/About.css';

const faqItems = [
  {
    question: 'How to recharge your OI prepaid number online?',
    answer: 'Log in, enter your OI prepaid number, pick a plan, and pay via UPI, cards, or net banking. Confirmation is instant.'
  },
  {
    question: 'What if I miss the monthly prepaid recharge due date? Will there be any penalty charges?',
    answer: 'OI does not levy penalties, but outgoing services pause until you recharge. Data/voice resume immediately after payment.'
  },
  {
    question: 'What are some popular OI prepaid recharge plans?',
    answer: 'Popular picks include daily-data packs (1.5–2GB/day), long-validity bundles, and OTT add-on plans. See Plans for details.'
  },
  {
    question: 'How to convert a prepaid number to a postpaid number?',
    answer: 'Submit a KYC request in the app or at an OI store, pick a postpaid plan, and complete verification. Your number stays the same.'
  },
  {
    question: 'How do I get free delivery of a new SIM card?',
    answer: 'Order a SIM through the app or web, choose doorstep delivery, and complete eKYC on arrival. Delivery is free in eligible areas.'
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="about-page">
      {/* Google Fonts for Outfit */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet" />

      <div className="background-decorations">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="cloudy-background">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
          <div className="cloud cloud-5"></div>
        </div>
      </div>

      <div className="about-hero card animate-slide-in">
        <div className="hero-text">
          <p className="eyebrow">About OI Recharge</p>
          <h1 className="gradient-text">Fast, secure recharges built for OI customers</h1>
          <p className="subtitle">
            Discover how to recharge, explore plans, and get answers to the most common OI recharge questions—all in one place.
          </p>
          <div className="hero-pills">
            <span className="pill">
              <Icon src={mobileIcon} size="18px" alt="Mobile" />
              Prepaid & postpaid support
            </span>
            <span className="pill">
              <Icon src={rechargeIcon} size="18px" alt="Payments" />
              UPI, cards, net banking
            </span>
          </div>
        </div>
        <div className="hero-illustration card-soft">
          <img src={userHeroImage} className="hero-custom-image" alt="OI Illustration" />
          <p className="mini-title">Need help?</p>
          <p className="mini-text">
            Browse the FAQs below to resolve the most common OI recharge questions in seconds.
          </p>
        </div>
      </div>

      <div className="faq card animate-slide-in stagger-1">
        <div className="faq-header">
          <h2 className="gradient-text">FAQ on OI recharges online</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleItem(idx)}
              >
                <div className="faq-question">
                  <span>{item.question}</span>
                  <span className="chevron" aria-hidden="true" />
                </div>
                {isOpen && <p className="faq-answer">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;

