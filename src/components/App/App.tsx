import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux';
import { store } from '../../store';

import { BoardsPage } from '../../pages/BoardsPage';
import { BoardPage } from '../../pages/BoardPage';
import { ErrorPage } from '../../pages/ErrorPage';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={BoardsPage} exact />
          <Route path="/board/:id" render={({ match }) => {
            const { id } = match.params;

            return <BoardPage id={id} />
          }} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export {
  App
};