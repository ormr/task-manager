import { combineReducers } from 'redux';
import { boardPreviewReducer } from './boardsPreviewReducer';
import { boardReducer } from './boardReducer';


const rootReducer = combineReducers({
  boards: boardPreviewReducer,
  board: boardReducer
});

export {
  rootReducer
};