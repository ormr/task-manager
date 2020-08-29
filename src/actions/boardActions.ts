import { Dispatch } from 'redux';
import { CREATE_BOARD, REMOVE_BOARD, boardActionTypes } from './constants';

interface CreateBoardProps {
  id: number
  title: string
}

export const createBoard = ({ id, title }: CreateBoardProps) => 
  (dispatch: Dispatch<boardActionTypes>) => {
    if (title) {
      dispatch({
        type: CREATE_BOARD,
        payload: {
          id,
          title,
          lists: []
        }
      });
    }
};

export const removeBoard = () => 
  (dispatch: Dispatch<boardActionTypes>) => {
    dispatch({
      type: REMOVE_BOARD
    });
}