import React from 'react';
import './App.css';

import { Board } from '../Board';

export const App: React.FC = (): JSX.Element => {
  return (
    <section className="app">
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </section>
  );
}