import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/svg/BackIcon2.svg';
import './index.css';

export const Nav: React.FC = () => {
  const location = useLocation();

  const backButton =
    location.pathname !== '/' ? (
      <Link to="/">
        <button>
          <BackIcon />
        </button>
      </Link>
    ) : null;

  return (
    <nav className="nav">
      {backButton}
      <Link className="nav__link" to="/">
        <h1>Task Manager</h1>
      </Link>
    </nav>
  );
};
