import {
  IBoard,
  ADD_LIST,
  ADD_CARD,
  DRAG_HAPPENED,
  EDIT_LIST_TITLE,
  EDIT_CARD_TEXT,
  boardActionTypes,
  REMOVE_LIST,
  REMOVE_CARD,
  FETCH_BOARD,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_FAILURE,
} from '../actions/constants';

const initialState: IBoard = {
  loading: false,
  error: false,
  title: '',
  lists: []
};

export const boardReducer = (state: IBoard = initialState, action: boardActionTypes) => {
  switch (action.type) {
    case FETCH_BOARD:
      return { ...state, loading: true };
    case FETCH_BOARD_SUCCESS:
      return { loading: false, title: action.payload.title, error: false, lists: action.payload.lists };
    case FETCH_BOARD_FAILURE:
      return { ...state, error: true };
    case ADD_LIST: {
      const lists = action.payload;
      return { ...state, lists };
    }
    case ADD_CARD: {
      const lists = action.payload;
      return { ...state, lists };
    }
    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      if (!state.lists) return state;

      const newState = { ...state };

      if (type === 'list') {
        const pulledOutlist = state.lists.splice(droppableIndexStart, 1);
        state.lists.splice(droppableIndexEnd, 0, ...pulledOutlist);
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.lists.find((list) => droppableIdStart === list.listId);
        if (!list) return state;

        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.lists.find((list) => droppableIdStart === list.listId);
        if (!listStart) return state;
        const card = listStart.cards.splice(droppableIndexStart, 1);

        const list = state.lists.find((list) => droppableIdEnd === list.listId);
        if (!list) return state;
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    case EDIT_LIST_TITLE: {
      if (!state.lists) return state;
      const newState = { ...state };
      const { listId, name } = action.payload;
      const list = state.lists.find((list) => list.listId === listId);

      if (!list) return state;
      list.name = name;

      return newState;
    }
    case EDIT_CARD_TEXT: {
      if (!state.lists) return state;
      const newState = { ...state };
      const { listId, cardId, text } = action.payload;
      const list = state.lists.find((list) => list.listId === listId);

      if (!list) return state;

      const card = list.cards.find((card) => card.cardId === cardId);

      if (!card) return state;

      card.text = text;
      return newState;
    }
    case REMOVE_LIST: {
      if (!state.lists) return state;
      const { listId } = action.payload;
      const newState = state.lists.filter((list) => list.listId !== listId);
      return newState;
    }
    case REMOVE_CARD: {
      if (!state.lists) return state;
      const newState = { ...state };
      const { listId, cardId } = action.payload;
      const list = state.lists.find((list) => list.listId !== listId);

      if (!list) return state;

      list.cards.filter((card) => card.cardId !== cardId);

      return newState;
    }
    default:
      return state;
  }
};