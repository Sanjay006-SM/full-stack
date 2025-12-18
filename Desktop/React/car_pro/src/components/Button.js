import React from 'react';
import '../styles/Button.css';

const Button = ({ 
  color = 'primary', 
  size = 'medium', 
  shape = 'rounded',
  onClick, 
  children, 
  className = '',
  type = 'button',
  disabled = false
}) => {
  const buttonClass = `btn btn-${color} btn-${size} btn-${shape} ${className}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
