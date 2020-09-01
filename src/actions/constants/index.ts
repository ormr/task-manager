export const CREATE_BOARD = 'CREATE_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const DRAG_HAPPENED = 'DRAG_HAPPENED';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD_TEXT = 'EDIT_CARD_TEXT';
export const REMOVE_CARD = 'REMOVE_CARD';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const EDIT_LIST_TITLE = 'EDIT_LIST_TITLE';


export interface IState {
  boards: IBoard[]
  lists: IList[]
  cards: ICard[]
}

export interface IBoard {
  id: number
  title: string
  lists: string[]
}

export interface IList {
  boardId?: number
  id: string
  title: string
  cards?: string[]
};

export interface ICard {
  id: string
  listId: string
  text: string
}

export interface IDrag {
  boardId: number
  droppableIdStart: string
  droppableIdEnd: string
  droppableIndexStart: number
  droppableIndexEnd: number
  draggableId: string
  type: string
}

// Board

interface createBoardAction {
  type: typeof CREATE_BOARD
  payload: IBoard
};

interface removeBoardAction {
  type: typeof REMOVE_BOARD
  payload?: IBoard
};

export type boardActionTypes =
  | createBoardAction
  | removeBoardAction
  | addListAction
  | dragHappened;

// List

interface addListAction {
  type: typeof ADD_LIST
  payload: IList
};

interface removeListAction {
  type: typeof REMOVE_LIST
  payload?: IList
};

interface editListTitleAction {
  type: typeof EDIT_LIST_TITLE
  payload?: IList
}

export type listActionTypes =
  | addListAction
  | removeListAction
  | addCardAction
  | editListTitleAction
  | dragActionTypes;

// Drag

interface dragHappened {
  type: typeof DRAG_HAPPENED,
  payload: IDrag
}

export type dragActionTypes = dragHappened;

// Card

interface addCardAction {
  type: typeof ADD_CARD
  payload: ICard
};

interface editCardAction {
  type: typeof EDIT_CARD_TEXT
  payload: {
    id: string
    text: string
  }
}

interface removeCardAction {
  type: typeof REMOVE_CARD
  payload?: ICard
};

export type cardActionTypes = addCardAction | removeCardAction | editCardAction;