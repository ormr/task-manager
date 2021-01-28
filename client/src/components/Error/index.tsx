import React from 'react';
import { ReactComponent as ErrorIcon } from '../../assets/svg/ErrorIcon.svg';

import './index.css';

export const Error: React.FC = () => {
  return (
    <div className="error">
      <ErrorIcon />
      <h3>Some troubles with the server.</h3>
    </div>
  );
};
