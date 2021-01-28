import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { store } from '../../store';

import { BoardList } from '../BoardList';
import { Board } from '../Board';
import { Error } from '../Error';
import { Nav } from '../Nav';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Nav />
          <Switch>
            <Route path="/" component={BoardList} exact />
            <Route
              path="/board/:id"
              render={({ match }) => {
                const { id } = match.params;

                return <Board boardId={id} />;
              }}
            />
            <Route component={Error} />
          </Switch>
        </Router>
      </DndProvider>
    </Provider>
  );
};

export { App };
