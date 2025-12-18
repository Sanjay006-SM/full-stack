import React, { createContext, useState, useContext, useEffect } from 'react';

const RechargeContext = createContext();

export const RechargeProvider = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [history, setHistory] = useState([]);

  // Initial Plans Data
  const [plans, setPlans] = useState([]);

  // Fetch plans from API on load
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/plans');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  const updateMobileNumber = (number) => {
    setMobileNumber(number);
  };

  const updateOperator = (op) => {
    setOperator(op);
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const updatePlan = async (updatedPlan) => {
    try {
      const response = await fetch(`http://localhost:5000/api/plans/${updatedPlan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlan)
      });

      if (response.ok) {
        const data = await response.json();
        // Update local state immediately
        setPlans(plans.map(p => p.id === data.id ? data : p));
      }
    } catch (error) {
      console.error('Failed to update plan:', error);
      throw error;
    }
  };

  const addPlan = async (newPlan) => {
    try {
      const response = await fetch('http://localhost:5000/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlan)
      });

      if (response.ok) {
        const data = await response.json();
        setPlans([...plans, data]);
        return data;
      }
    } catch (error) {
      console.error('Failed to add plan:', error);
      throw error;
    }
  };

  const getPlanById = (id) => {
    return plans.find(p => p.id === parseInt(id));
  };

  const generateTransactionId = () => {
    const id = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
    setTransactionId(id);
    addToHistory({
      mobileNumber,
      operator,
      plan: selectedPlan,
      transactionId: id,
      timestamp: new Date().toLocaleString(),
    });
    return id;
  };

  const addToHistory = (transaction) => {
    setHistory([...history, transaction]);
    localStorage.setItem('rechargeHistory', JSON.stringify([...history, transaction]));
  };

  const resetData = () => {
    setMobileNumber('');
    setOperator('');
    setSelectedPlan(null);
    setTransactionId('');
  };

  return (
    <RechargeContext.Provider
      value={{
        mobileNumber,
        operator,
        selectedPlan,
        transactionId,
        history,
        plans,
        updateMobileNumber,
        updateOperator,
        selectPlan,
        updatePlan,
        addPlan,
        getPlanById,
        generateTransactionId,
        resetData,
        fetchPlans,
      }}
    >
      {children}
    </RechargeContext.Provider>
  );
};

export const useRecharge = () => {
  const context = useContext(RechargeContext);
  if (!context) {
    throw new Error('useRecharge must be used within RechargeProvider');
  }
  return context;
};
