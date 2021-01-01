import { combineReducers } from 'redux';
import { boardReducer } from './boardsReducer';
import { listReducer } from './listsReducer';


const rootReducer = combineReducers({
  boards: boardReducer,
  lists: listReducer
});

export {
  rootReducer
};