import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecharge } from '../context/RechargeContext';
import Button from '../components/Button';
import Icon from '../components/Icon';
import planIcon from '../assets/icons/plan.svg';
import mobileIcon from '../assets/icons/mobile.svg';
import rechargeIcon from '../assets/icons/recharge.svg';
import successIcon from '../assets/icons/success.svg';
import '../styles/JioPlans.css';

const JioPlans = () => {
  const navigate = useNavigate();
  const { plans, fetchPlans } = useRecharge();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const selectedOperator = localStorage.getItem('jioOperator') || 'Jio';
  const filteredPlans = plans.filter(plan => plan.operator === selectedOperator);

  // Removed hardcoded jioplans array as it is now in context

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.id);
    localStorage.setItem('jioSelectedPlan', JSON.stringify(plan));
    setTimeout(() => navigate('/jio-payment'), 300);
  };

  return (
    <div className="jio-plans-page animate-fade">
      <div className="plans-header animate-slide-up">
        <p className="eyebrow">Step 2</p>
        <h1>Available Plans</h1>
        <p>Choose the best plan for your needs before you pay</p>
      </div>

      <div className="plans-container">
        {filteredPlans.map((plan, index) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''} animate-scale stagger-${(index % 4) + 1}`}
          >
            {plan.popular && (
              <span className="popular-badge">
                <Icon src={successIcon} size="14px" alt="Popular" /> Popular
              </span>
            )}

            <div className="plan-header">
              <h2 className="plan-price">{plan.price}</h2>
              <p className="plan-validity">{plan.validity}</p>
            </div>

            <div className="plan-content">
              <div className="plan-item">
                <Icon src={planIcon} size="18px" alt="Data" />
                <div>
                  <p className="label">Data</p>
                  <p className="value">{plan.data}</p>
                </div>
              </div>

              <div className="plan-item">
                <Icon src={mobileIcon} size="18px" alt="Voice" />
                <div>
                  <p className="label">Voice</p>
                  <p className="value">{plan.calls}</p>
                </div>
              </div>

              <div className="plan-item">
                <Icon src={rechargeIcon} size="18px" alt="SMS" />
                <div>
                  <p className="label">SMS</p>
                  <p className="value">{plan.sms}</p>
                </div>
              </div>
            </div>

            <div className="plan-benefits">
              <h4>Includes:</h4>
              <ul>
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <Icon src={successIcon} size="14px" alt="Included" /> {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              color={plan.popular ? 'secondary' : 'primary'}
              size="large"
              className="btn-block"
              onClick={() => handleSelectPlan(plan)}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </Button>
          </div>
        ))}
      </div>

      <div className="plans-footer">
        <Button
          color="light"
          size="large"
          onClick={() => navigate('/jio-recharge')}
        >
          Back to Number
        </Button>
      </div>
    </div>
  );
};

export default JioPlans;

