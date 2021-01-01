// Board
export const GET_BOARDS = 'GET_BOARDS';
export const CREATE_BOARD = 'CREATE_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const BOARD_ERROR = 'BOARD_ERROR';
// Drag
export const DRAG_HAPPENED = 'DRAG_HAPPENED';
// Card
export const GET_CARD = 'GET_CARD';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD_TEXT = 'EDIT_CARD_TEXT';
export const REMOVE_CARD = 'REMOVE_CARD';
export const CARD_ERROR = 'CARD_ERROR';
// List
export const GET_LIST = 'GET_LIST';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const EDIT_LIST_TITLE = 'EDIT_LIST_TITLE';
export const LIST_ERROR = 'LIST_ERROR';


export interface IState {
  boards: IBoard[]
  lists: IList[]
  cards: ICard[]
}

export interface IBoard {
  boardId: string
  title: string
  lists: string[]
}

export interface IList {
  listId: string;
  name: string
  cards: ICard[]
};

export interface ICard {
  cardId: string
  text: string
}

export interface IDrag {
  boardId: string
  droppableIdStart: string
  droppableIdEnd: string
  droppableIndexStart: number
  droppableIndexEnd: number
  draggableId: string
  type: string
}

// Board


interface errorBoardAction {
  type: typeof BOARD_ERROR
  payload: {
    msg: string;
    status: string;
  }
}

interface getBoardAction {
  type: typeof GET_BOARDS,
  payload: IBoard[]
}

interface createBoardAction {
  type: typeof CREATE_BOARD
  payload: IBoard
};

interface removeBoardAction {
  type: typeof REMOVE_BOARD
  payload?: IBoard
};

export type boardActionTypes =
  | getBoardAction
  | createBoardAction
  | removeBoardAction
  | addListAction
  | dragHappened
  | errorBoardAction;

// List

interface getListAction {
  type: typeof GET_LIST,
  payload: IList
}

interface addListAction {
  type: typeof ADD_LIST
  payload: IList
};

interface removeListAction {
  type: typeof REMOVE_LIST
  payload: {
    listId: string;
  }
};

interface editListTitleAction {
  type: typeof EDIT_LIST_TITLE
  payload: {
    boardId: string;
    listId: string;
    name: string;
  }
}

interface errorListAction {
  type: typeof LIST_ERROR
  payload: {
    msg: string;
    status: string;
  }
}

export type listActionTypes =
  | addListAction
  | removeListAction
  | removeCardAction
  | addCardAction
  | editListTitleAction
  | editCardTextAction
  | dragActionTypes
  | getListAction
  | errorListAction;

// Drag

interface dragHappened {
  type: typeof DRAG_HAPPENED,
  payload: IDrag
}

export type dragActionTypes = dragHappened;

// Card


interface errorCardAction {
  type: typeof CARD_ERROR
  payload: {
    msg: string;
    status: string;
  }
}

interface addCardAction {
  type: typeof ADD_CARD
  payload: {
    listId: string;
    cardId: string;
    text: string;
  }
};

interface editCardTextAction {
  type: typeof EDIT_CARD_TEXT
  payload: {
    boardId: string;
    listId: string;
    cardId: string
    text: string
  }
}

interface removeCardAction {
  type: typeof REMOVE_CARD
  payload: {
    listId: string;
    cardId: string;
  }
};

export type cardActionTypes =
  | addCardAction
  | removeCardAction
  | editCardTextAction
  | errorCardAction;