import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  return (
    <div>
      <h1>ErrorPage</h1>
      <Link to="/">Return</Link>
    </div>
  );
}