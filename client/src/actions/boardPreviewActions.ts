import { Dispatch } from 'redux';
import { api } from '../utils'
import { BOARD_ERROR, FETCH_BOARDS_PREVIEW, CREATE_BOARD, REMOVE_BOARD, boardPreviewActionTypes, FETCH_BOARDS_PREVIEW_SUCCESS, FETCH_BOARDS_PREVIEW_FAILURE } from './constants';

export const getBoards = () => async (dispatch: Dispatch<boardPreviewActionTypes>) => {
  try {
    dispatch({
      type: FETCH_BOARDS_PREVIEW,
      payload: []
    });

    const res = await api.get('/board/all');

    dispatch({
      type: FETCH_BOARDS_PREVIEW_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_BOARDS_PREVIEW_FAILURE,
      payload: []
    })
  }
}

interface CreateBoardProps {
  title: string
}

export const createBoard = ({ title }: CreateBoardProps) =>
  async (dispatch: Dispatch<boardPreviewActionTypes>) => {
    try {
      const res = await api.post('/board', { title });

      dispatch({
        type: CREATE_BOARD,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

export interface removeBoardProps {
  boardId: string;
}

export const removeBoard = ({ boardId }: removeBoardProps) =>
  async (dispatch: Dispatch<boardPreviewActionTypes>) => {
    try {
      await api.delete(`/board/${boardId}`);

      dispatch({
        type: REMOVE_BOARD,
        payload: {
          boardId
        }
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }