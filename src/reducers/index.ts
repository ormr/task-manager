import { combineReducers } from 'redux';
import { boardReducer } from './boardsReducer';
import { listReducer } from './listsReducer';
import { cardReducer } from './cardsReducer'


const rootReducer = combineReducers({
  boards: boardReducer,
  cards: cardReducer,
  lists: listReducer
});

export {
  rootReducer
};