import { combineReducers } from 'redux';
import { board } from './board';

const rootReducer = combineReducers({
  board
});

export {
  rootReducer
};