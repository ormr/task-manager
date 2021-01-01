import { Dispatch } from 'redux';
import { api } from '../utils';
import { GET_LIST, ADD_LIST, EDIT_LIST_TITLE, REMOVE_LIST, LIST_ERROR, listActionTypes } from './constants';

interface getListsProps {
  boardId: string;
}

export const getLists = ({ boardId }: getListsProps) => async (dispatch: Dispatch<listActionTypes>) => {
  try {
    const res = await api.get(`/board/${boardId}`);

    dispatch({
      type: GET_LIST,
      payload: res.data.lists
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

interface addListProps {
  boardId: string;
  name: string
}

export const addList = ({ boardId, name }: addListProps) =>
  async (dispatch: Dispatch<listActionTypes>) => {
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
  async (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: EDIT_LIST_TITLE,
      payload: {
        boardId,
        listId,
        name
      }
    });

    await api.put(`/board/update/${boardId}/list/${listId}`, {
      name
    });
  }

export interface removeListProps {
  boardId: string;
  listId: string;
}

export const removeList = ({ boardId, listId }: removeListProps) =>
  async (dispatch: Dispatch<listActionTypes>) => {

    dispatch({
      type: REMOVE_LIST,
      payload: {
        listId
      }
    });

    await api.delete(`/board/${boardId}/list/${listId}`)
  }