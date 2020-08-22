import { Dispatch } from 'redux';
import { CREATE_BOARD, REMOVE_BOARD, boardActionTypes } from './constants';

interface Props {
  id: string
  title: string
}

export const createBoard = ({ id, title }: Props) => 
  (dispatch: Dispatch<boardActionTypes>) => {
    if (title) {
      dispatch({
        type: CREATE_BOARD,
        payload: {
          id,
          title
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