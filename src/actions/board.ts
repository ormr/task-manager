import { Dispatch } from 'redux';
import { CREATE_BOARD, REMOVE_BOARD, boardActionTypes } from './constants';

interface Props {
  title: string
}

export const createBoard = ({ title }: Props) => 
  (dispatch: Dispatch<boardActionTypes>) => {
    dispatch({
      type: CREATE_BOARD,
      payload: title
    });
}

export const removeBoard = () => 
  (dispatch: Dispatch<boardActionTypes>) => {
    dispatch({
      type: REMOVE_BOARD
    });
}