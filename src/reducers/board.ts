import { Reducer } from 'redux';
import { IBoard, CREATE_BOARD, REMOVE_BOARD, boardActionTypes } from '../actions/constants';

const initialState: IBoard[] = [

]

export const board: Reducer = (state = initialState, action: boardActionTypes) => {
  switch (action.type) {
    case CREATE_BOARD:
      return state;
    case REMOVE_BOARD:
      return state;
    default:
      return state;
  }
}