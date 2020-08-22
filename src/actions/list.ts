import { Dispatch } from 'redux';
import { ADD_LIST, REMOVE_LIST, listActionTypes } from './constants';

interface Props {
  boardId: number
  id: number
  title: string
}

export const addList = ({ boardId, id, title }: Props) => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: ADD_LIST,
      payload: {
        boardId,
        id,
        title
      }
    });
}

export const removeList = () => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: REMOVE_LIST
    });
}