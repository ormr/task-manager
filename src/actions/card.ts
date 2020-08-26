import { Dispatch } from 'redux';
import { ICard, ADD_CARD, REMOVE_CARD, cardActionTypes } from './constants';


export const addCardItem = ({ id, listId, boardId, text }: ICard) => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: ADD_CARD,
      payload: {
        id: `${id}-${listId}-${boardId}`,
        listId: listId,
        boardId: boardId,
        text: text
      }
    });
}

export const removeCardItem = () => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: REMOVE_CARD
    });
}