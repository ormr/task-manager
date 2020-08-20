import React from 'react';
import { Link } from 'react-router-dom';
import './Board.css';

import { List } from '../List';

interface Props {
  title: string
};

export const Board: React.FC<Props> = ({ title }: Props): JSX.Element => {
  return (
    <div className="board">
      <h3>{title}</h3>
      <Link to="/shit">Go</Link>
    </div>
  );
}