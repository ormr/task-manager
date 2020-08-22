import { Reducer } from 'redux';
import {
  IState,
  CREATE_BOARD,
  REMOVE_BOARD,
  ADD_CARD,
  REMOVE_CARD,
  ADD_LIST,
  REMOVE_LIST,
  stateActionTypes } from '../actions/constants';

const initialState: IState[] = [

];

export const reducer: Reducer = (state = initialState, action: stateActionTypes) => {
  console.log(state);
  switch (action.type) {
    case CREATE_BOARD:
      const boardId = action.payload.id;
      const boardTitle = action.payload.title;
      return [...state, { id: boardId, title: boardTitle, lists: [] }];
    case REMOVE_BOARD:
      return state;
    case ADD_CARD:
      return state;
    case REMOVE_CARD:
      return state;
    case ADD_LIST:
      const boardIdForList = state.findIndex((item: any) => item.id == action.payload.boardId);
      const board = state[boardIdForList];
      const lists = board.lists;
      const obj = {
        boardId: +action.payload.boardId,
        id: action.payload.id,
        title: action.payload.title
      }
      const newLists = [...lists, obj];
      const newBoard = { ...board, lists: newLists };
      return [
      ...state.slice(0, boardIdForList),
      newBoard,
      ...state.slice(boardIdForList + 1)
      ]
    case REMOVE_LIST:
      return state;
    default:
      return state;
  }
}