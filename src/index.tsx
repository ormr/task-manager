import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Redux

import { Provider } from 'react-redux';
import { store } from './store';

import { App } from './components/App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);