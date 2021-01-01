import {
  IList,
  ADD_LIST,
  ADD_CARD,
  DRAG_HAPPENED,
  EDIT_LIST_TITLE,
  EDIT_CARD_TEXT,
  listActionTypes,
  GET_LIST,
  REMOVE_LIST,
  REMOVE_CARD
} from '../actions/constants';

const initialState: IList[] = [];

export const listReducer = (state: IList[] = initialState, action: listActionTypes) => {
  switch (action.type) {
    case GET_LIST:
      return action.payload;
    case ADD_LIST:
      return action.payload;
    case ADD_CARD:
      return action.payload;
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
        const pulledOutlist = state.splice(droppableIndexStart, 1);
        state.splice(droppableIndexEnd, 0, ...pulledOutlist);
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.listId);
        if (!list) return state;

        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.listId);
        if (!listStart) return state;
        const card = listStart.cards.splice(droppableIndexStart, 1);

        const list = state.find((list) => droppableIdEnd === list.listId);
        if (!list) return state;
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    case EDIT_LIST_TITLE: {
      const newState = [...state]
      const { listId, name } = action.payload;
      const list = state.find((list) => list.listId === listId);

      if (!list) return state;
      list.name = name;

      return newState;
    }
    case EDIT_CARD_TEXT: {
      const newState = [...state]
      const { listId, cardId, text } = action.payload;
      const list = state.find((list) => list.listId === listId);

      if (!list) return state;

      const card = list.cards.find((card) => card.cardId === cardId);

      if (!card) return state;

      card.text = text;
      return newState;
    }
    case REMOVE_LIST: {
      const { listId } = action.payload;
      const newState = state.filter((list) => list.listId !== listId);
      return newState;
    }
    case REMOVE_CARD: {
      const newState = [...state];
      const { listId, cardId } = action.payload;
      const list = state.find((list) => list.listId !== listId);

      if (!list) return state;

      list.cards.filter((card) => card.cardId !== cardId);

      return newState;
    }
    default:
      return state;
  }
};