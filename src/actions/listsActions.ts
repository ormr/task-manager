import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { ADD_LIST, REMOVE_LIST, listActionTypes } from './constants';

interface Props {
  boardId: number
  title: string
}

export const addList = ({ boardId, title }: Props) => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: ADD_LIST,
      payload: {
        boardId,
        id: uuidv4(),
        title,
        cards: []
      }
    });
}

export const removeList = () => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: REMOVE_LIST
    });
}