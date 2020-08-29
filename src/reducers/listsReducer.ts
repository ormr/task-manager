import { Reducer } from 'redux';
import { IList, ADD_LIST, ADD_CARD, REMOVE_LIST, DRAG_HAPPENED, listActionTypes } from '../actions/constants';

const initialState: IList[] = [
  {
    boardId: 0,
    id: '8562308e-d730-44bc-be39-7ad4b0a87b95',
    title: 'Tasks',
    cards: [
      'fc7a1576-082e-4e32-b7dd-0432739e44c8',
      'af3754aa-43bc-4030-a872-6689e6d76d4c',
      '2515d7ca-32b1-47a7-bc80-5965a1dda153'
    ]
  }
];

export const listReducer: Reducer = (state = initialState, action: listActionTypes) => {
  switch (action.type) {
    case ADD_LIST:
      return [...state, action.payload];
    case ADD_CARD:
      const { listId, id } = action.payload;
      const list = state.find((list: any) => list.id === listId);
      const newCards = [...list.cards, id];
      list.cards = newCards;
      const listIndex = state.findIndex((list: any) => list.id === listId);
      return [...state.slice(0, listIndex), list, ...state.slice(listIndex + 1)];
    case REMOVE_LIST:
      return state;
    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      const newState = [...state];

      if (type === 'list') {
        return state;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list: any) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list: any) => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);

        const list = state.find((list: any) => droppableIdEnd === list.id);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;
    default:
      return state;
  }
};