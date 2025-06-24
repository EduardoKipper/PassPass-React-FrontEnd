import React from 'react';
import './GenericButton.css';

const GenericButton = ({ onClick, children, type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`generic-button ${className}`}>
    {children}
  </button>
);

export default GenericButton;
