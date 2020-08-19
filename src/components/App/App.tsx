import React from 'react';
import './App.css';

// Redux

import { Provider } from 'react-redux';
import { store } from '../../store';

import { Board } from '../Board';

export const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <section className="app">
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </section>
    </Provider>
  );
}