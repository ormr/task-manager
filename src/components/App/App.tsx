import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import { Provider } from 'react-redux';
import { store } from '../../store';

import { BoardsPage } from '../../pages/BoardsPage';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" render={() => <BoardsPage />} exact/>
        </Switch>
      </Router>
    </Provider>
  );
}

export {
  App
};