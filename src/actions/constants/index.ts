export const CREATE_BOARD = 'CREATE_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';


export interface IState {
  id: number
  title: string
  lists: {
    id: number
    title: string
    cards: {
      id: number
      text: string
    }[]
  }[]
};

// Board

export interface IBoard {
  id?: string
  title: string
}

interface createBoardAction {
  type: typeof CREATE_BOARD
  payload: IBoard
};

interface removeBoardAction {
  type: typeof REMOVE_BOARD
  payload?: IBoard
};

export type boardActionTypes = createBoardAction | removeBoardAction;

// Card

export interface ICard {
  id: number
  listId: number
  boardId: number
  text: string
}

interface addCardAction {
  type: typeof ADD_CARD
  payload: ICard
};

interface removeCardAction {
  type: typeof REMOVE_CARD
  payload?: ICard
};

export type cardActionTypes = addCardAction | removeCardAction;

// List

export interface IList {
  boardId: number
  id: number
  title: string
};

interface addListAction {
  type: typeof ADD_LIST
  payload: IList
};

interface removeListAction {
  type: typeof REMOVE_LIST
  payload?: IList
};

export type listActionTypes = addListAction | removeListAction;

export type stateActionTypes =
  | createBoardAction
  | removeBoardAction
  | addCardAction
  | removeCardAction
  | addListAction
  | removeListAction;