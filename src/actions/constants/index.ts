export const CREATE_BOARD = 'CREATE_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';

// Board

export interface IBoard {
  id: string
  title: string
}

interface createBoardAction {
  type: typeof CREATE_BOARD
  payload: string
};

interface removeBoardAction {
  type: typeof REMOVE_BOARD
  payload?: string
};

export type boardActionTypes = createBoardAction | removeBoardAction;

// Card

interface addCardAction {
  type: typeof ADD_CARD
  payload: string
};

interface removeCardAction {
  type: typeof REMOVE_CARD
  payload?: string
};

export type cardActionTypes = addCardAction | removeCardAction;

// List

interface addListAction {
  type: typeof ADD_LIST
  payload: string
};

interface removeListAction {
  type: typeof REMOVE_LIST
  payload?: string
};

export type listActionTypes = addListAction | removeListAction;