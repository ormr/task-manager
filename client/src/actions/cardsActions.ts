import { Dispatch } from 'redux';
import { api } from '../utils';
import {
  ADD_CARD,
  REMOVE_CARD,
  CARD_ERROR,
  EDIT_CARD_TEXT,
  cardActionTypes,
  DRAG_HAPPENED,
  dragActionTypes
} from './constants';

interface AddCardProps {
  boardId: string;
  listId: string;
  text: string;
}


export const addCardItem = ({ boardId, listId, text }: AddCardProps) =>
  async (dispatch: Dispatch<cardActionTypes>) => {

    try {
      const res = await api.put(`/board/${boardId}/list/${listId}/card`, {
        text
      });

      dispatch({
        type: ADD_CARD,
        payload: res.data.lists
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

interface moveCardItemProps {
  boardId: string;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
  type: string;
};

export const moveCardItem = ({
  boardId,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
}: moveCardItemProps) => async (dispatch: Dispatch<dragActionTypes>) => {

  dispatch({
    type: DRAG_HAPPENED,
    payload: {
      boardId,
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  });

  try {
    await api.put(`/board/drag/${boardId}`, {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      type
    });
  } catch (err) {
    console.error(err);
    // dispatch({
    //   type: DRAG_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
}

export interface editCardItemProps {
  boardId: string;
  listId: string;
  cardId: string
  text: string
}

export const editCardItem = ({ boardId, listId, cardId, text }: editCardItemProps) =>
  async (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: EDIT_CARD_TEXT,
      payload: {
        boardId,
        listId,
        cardId,
        text
      }
    });

    try {
      await api.put(`/board/update/${boardId}/list/${listId}/card/${cardId}`, {
        text
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


export interface removeCardItemProps {
  boardId: string;
  listId: string;
  cardId: string;
}

export const removeCardItem = ({ boardId, listId, cardId }: removeCardItemProps) =>
  async (dispatch: Dispatch<cardActionTypes>) => {

    dispatch({
      type: REMOVE_CARD,
      payload: {
        listId,
        cardId
      }
    });

    try {
      await api.delete(`/board/${boardId}/list/${listId}/card/${cardId}`);
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }