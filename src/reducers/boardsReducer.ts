import { Reducer } from 'redux';
import {
  IBoard,
  IList,
  DRAG_HAPPENED,
  CREATE_BOARD,
  ADD_LIST,
  REMOVE_BOARD,
  boardActionTypes
} from '../actions/constants';

const initialState: IBoard[] = [
  {
    id: 0,
    title: 'Todo',
    lists: [
    '8562308e-d730-44bc-be39-7ad4b0a87b95'
    ]
  }
]

export const boardReducer: Reducer = (state = initialState, action: boardActionTypes) => {
  switch (action.type) {
    case CREATE_BOARD: {
      const { id: boardId, title: boardTitle, lists: boardLists  } = action.payload
      return [...state, { id: boardId, title: boardTitle, lists: boardLists }];
    }
    case ADD_LIST: {
      const { boardId, id }: IList = action.payload;
      if (boardId === undefined) return state;
      const board = state.find((board: IBoard) => board.id === boardId);
      const newLists = [...board.lists, id];
      board.lists = newLists;
      return [...state.slice(0, boardId), board, ...state.slice(boardId + 1)];
    }
    case DRAG_HAPPENED: {
      const {
        boardId,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      const board = state[boardId];
      const lists = board.lists

      if (type === 'list') {
        const pulledOutlist = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutlist);
        board.lists = lists;
      }

      return [...state.slice(0, boardId), board, ...state.slice(boardId + 1)];
    }
    case REMOVE_BOARD: {
      return state;
    }
    default:
      return state;
  }
}