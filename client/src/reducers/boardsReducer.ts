import { Reducer } from 'redux';
import {
  IBoard,
  GET_BOARDS,
  CREATE_BOARD,
  REMOVE_BOARD,
  boardActionTypes
} from '../actions/constants';

const initialState: IBoard[] = [];

export const boardReducer: Reducer = (state = initialState, action: boardActionTypes) => {
  switch (action.type) {
    case GET_BOARDS: {
      return action.payload;
    }
    case CREATE_BOARD: {
      const { boardId, title: boardTitle, lists: boardLists } = action.payload
      return [...state, { boardId, title: boardTitle, lists: boardLists }];
    }
    case REMOVE_BOARD: {
      return state;
    }
    default:
      return state;
  }
}