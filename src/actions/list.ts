import { Dispatch } from 'redux';
import { ADD_LIST, REMOVE_LIST, listActionTypes } from './constants';

interface Props {
  title: string
}

export const addList = ({ title }: Props) => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: ADD_LIST,
      payload: title
    });
}

export const removeList = () => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: REMOVE_LIST
    });
}