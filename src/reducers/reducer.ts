import { Reducer } from 'redux';
import {
  IState,
  CREATE_BOARD,
  REMOVE_BOARD,
  ADD_CARD,
  CARD_DRAG_HAPPENED,
  REMOVE_CARD,
  ADD_LIST,
  REMOVE_LIST,
  stateActionTypes } from '../actions/constants';

const initialState: IState[] = [

];

export const reducer: Reducer = (state = initialState, action: stateActionTypes) => {
  switch (action.type) {
    case CREATE_BOARD: {
      const boardId = action.payload.id;
      const boardTitle = action.payload.title;
      return [...state, { id: boardId, title: boardTitle, lists: [] }];
    }
    case REMOVE_BOARD:
      return state;
    case ADD_CARD:
      const card = {
        id: action.payload.id,
        listId: action.payload.listId,
        boardId: action.payload.boardId,
        text: action.payload.text
      }

      const newCards = [...state[action.payload.boardId].lists[action.payload.listId].cards, card];
      const newList = [
        ...state[action.payload.boardId].lists.slice(0, action.payload.listId),
        {
          ...state[action.payload.boardId].lists[action.payload.listId],
          cards: newCards
        },
        ...state[action.payload.boardId].lists.slice(action.payload.listId + 1)
      ];

      const newBoardWithCards = {...state[action.payload.boardId], lists: newList};
      return [
        ...state.slice(0, action.payload.boardId),
        newBoardWithCards,
        ...state.slice(action.payload.boardId + 1)
      ];
    case CARD_DRAG_HAPPENED:
      const {
        boardId,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId
      } = action.payload;

      const newState = [...state];

      if (droppableIdStart === droppableIdEnd) {
        const list = state[boardId].lists.find((list: any) => +droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const oldList = state[boardId].lists.find((list: any) => +droppableIdStart === list.id);
        const card = oldList.cards.splice(droppableIndexStart, 1);

        const list = state[boardId].lists.find((list: any) => +droppableIdEnd === list.id);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;
    case REMOVE_CARD:
      return state;
    case ADD_LIST:
      const boardIdForList = state.findIndex((item: any) => item.id === action.payload.boardId);
      const board = state[boardIdForList];
      const lists = board.lists;
      const obj = {
        boardId: action.payload.boardId,
        id: action.payload.id,
        title: action.payload.title,
        cards: []
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