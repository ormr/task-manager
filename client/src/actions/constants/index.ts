// Fetching boards
export const FETCH_BOARDS_PREVIEW = 'FETCH_BOARDS_PREVIEW';
export const FETCH_BOARDS_PREVIEW_SUCCESS = 'FETCH_BOARDS_PREVIEW_SUCCESS';
export const FETCH_BOARDS_PREVIEW_FAILURE = 'FETCH_BOARDS_PREVIEW_FAILURE';

// Board
export const CREATE_BOARD = 'CREATE_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const BOARD_ERROR = 'BOARD_ERROR';
// Drag
export const DRAG_HAPPENED = 'DRAG_HAPPENED';
// Card
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD_TEXT = 'EDIT_CARD_TEXT';
export const REMOVE_CARD = 'REMOVE_CARD';
export const CARD_ERROR = 'CARD_ERROR';
// Board
export const FETCH_BOARD = 'FETCH_BOARD';
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const FETCH_BOARD_FAILURE = 'FETCH_BOARD_FAILURE';
// List
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const EDIT_LIST_TITLE = 'EDIT_LIST_TITLE';
export const LIST_ERROR = 'LIST_ERROR';


export interface IState {
  boards: IBoardsPreview
  board: IBoard
}

export interface IBoardsPreview {
  loading: boolean;
  error: boolean;
  boards: IBoardPreview[];
}

export interface IBoardPreview {
  boardId: string
  title: string
}

export interface IBoard {
  loading: boolean;
  error: boolean;
  title: string;
  lists: IList[];
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

// BoardPreview

interface errorBoardAction {
  type: typeof BOARD_ERROR
  payload: {
    msg: string;
    status: string;
  }
}

interface fetchBoardsPreviewAction {
  type: typeof FETCH_BOARDS_PREVIEW
  payload: IBoardPreview[]
}

interface fetchBoardsPreviewActionSuccess {
  type: typeof FETCH_BOARDS_PREVIEW_SUCCESS,
  payload: IBoardPreview[]
}

interface fetchBoardsPreviewActionFailure {
  type: typeof FETCH_BOARDS_PREVIEW_FAILURE,
  payload: IBoardPreview[]
}

interface createBoardAction {
  type: typeof CREATE_BOARD
  payload: IBoardPreview
};

interface removeBoardAction {
  type: typeof REMOVE_BOARD
  payload: {
    boardId: string;
  }
};

export type boardPreviewActionTypes =
  | fetchBoardsPreviewAction
  | fetchBoardsPreviewActionSuccess
  | fetchBoardsPreviewActionFailure
  | createBoardAction
  | removeBoardAction
  | addListAction
  | dragHappened
  | errorBoardAction;

// Board

interface fetchBoardAction {
  type: typeof FETCH_BOARD
  payload: IBoard | {}
}

interface fetchBoardActionSuccess {
  type: typeof FETCH_BOARD_SUCCESS,
  payload: IBoard
}

interface fetchBoardActionFailure {
  type: typeof FETCH_BOARD_FAILURE,
  payload: IBoard | {}
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

export type boardActionTypes =
  | fetchBoardAction
  | fetchBoardActionSuccess
  | fetchBoardActionFailure
  | addListAction
  | removeListAction
  | removeCardAction
  | addCardAction
  | editListTitleAction
  | editCardTextAction
  | dragActionTypes
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