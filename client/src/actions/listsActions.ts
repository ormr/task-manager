import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { ADD_LIST, EDIT_LIST_TITLE, REMOVE_LIST, listActionTypes } from './constants';

interface addListProps {
  boardId: number
  title: string
}

export const addList = ({ boardId, title }: addListProps) => 
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

interface editTitleProps {
  listId: string
  title: string
}

export const editListTitle = ({ listId, title }: editTitleProps) => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: EDIT_LIST_TITLE,
      payload: {
        id: listId,
        title
      }
    })
  }

export const removeList = () => 
  (dispatch: Dispatch<listActionTypes>) => {
    dispatch({
      type: REMOVE_LIST
    });
}