import { Dispatch } from 'redux';
import { api } from '../utils'
import { BOARD_ERROR, GET_BOARDS, CREATE_BOARD, REMOVE_BOARD, boardActionTypes } from './constants';

interface CreateBoardProps {
  title: string
}

export const getBoards = () => async (dispatch: Dispatch<boardActionTypes>) => {
  try {
    const res = await api.get('/board/all');

    dispatch({
      type: GET_BOARDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const createBoard = ({ title }: CreateBoardProps) =>
  async (dispatch: Dispatch<boardActionTypes>) => {
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

export const removeBoard = () =>
  (dispatch: Dispatch<boardActionTypes>) => {
    dispatch({
      type: REMOVE_BOARD
    });
  }