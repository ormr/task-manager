import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  return (
    <div>
      <h1>ErrorPage</h1>
      <Link to="/">
        <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="19.5" height="2" fill="#C4C4C4"/>
          <rect x="1.24609" y="5.832" width="10.2376" height="1.70709" transform="rotate(45 1.24609 5.832)" fill="#C4C4C4"/>
          <rect x="0.0394287" y="7.03177" width="9.94445" height="2" transform="rotate(-45 0.0394287 7.03177)" fill="#C4C4C4"/>
        </svg>
      </Link>
    </div>
  );
}