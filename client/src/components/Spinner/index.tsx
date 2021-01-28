import React from 'react';
import './index.css';

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="loader">Loading...</div>
    </div>
  );
};
