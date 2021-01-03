import { Dispatch } from 'redux';
import { api } from '../utils';
import { ADD_LIST, EDIT_LIST_TITLE, REMOVE_LIST, LIST_ERROR, boardActionTypes, FETCH_BOARD, FETCH_BOARD_SUCCESS, FETCH_BOARD_FAILURE } from './constants';

interface getListsProps {
  boardId: string;
}

export const getLists = ({ boardId }: getListsProps) => async (dispatch: Dispatch<boardActionTypes>) => {
  try {
    dispatch({
      type: FETCH_BOARD,
      payload: {}
    });


    const res = await api.get(`/board/${boardId}`);

    dispatch({
      type: FETCH_BOARD_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_BOARD_FAILURE,
      payload: {}
    });
  }
}

interface addListProps {
  boardId: string;
  name: string
}

export const addList = ({ boardId, name }: addListProps) =>
  async (dispatch: Dispatch<boardActionTypes>) => {
    try {
      const res = await api.put(`/board/${boardId}/list`, {
        boardId,
        name
      });

      dispatch({
        type: ADD_LIST,
        payload: res.data.lists
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: { msg: err, status: err }
      });
    }
  }

export interface editTitleProps {
  boardId: string;
  listId: string
  name: string
}

export const editListTitle = ({ boardId, listId, name }: editTitleProps) =>
  async (dispatch: Dispatch<boardActionTypes>) => {
    dispatch({
      type: EDIT_LIST_TITLE,
      payload: {
        boardId,
        listId,
        name
      }
    });

    try {
      await api.put(`/board/update/${boardId}/list/${listId}`, {
        name
      });
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: { msg: err, status: err }
      });
    }
  }

export interface removeListProps {
  boardId: string;
  listId: string;
}

export const removeList = ({ boardId, listId }: removeListProps) =>
  async (dispatch: Dispatch<boardActionTypes>) => {

    dispatch({
      type: REMOVE_LIST,
      payload: {
        listId
      }
    });

    try {
      await api.delete(`/board/${boardId}/list/${listId}`);
    } catch (err) {
      dispatch({
        type: LIST_ERROR,
        payload: { msg: err, status: err }
      });
    }
  }