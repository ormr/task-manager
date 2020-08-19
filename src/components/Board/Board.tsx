import React from 'react';
import './Board.css';

import { List } from '../List';

export const Board: React.FC = (): JSX.Element => {
  return (
    <div className="board">
      <h3>BoardName</h3>
      <List />
    </div>
  );
}