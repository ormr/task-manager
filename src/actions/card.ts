import { Dispatch } from 'redux';
import { ICard, ADD_CARD, REMOVE_CARD, cardActionTypes, IDrag, CARD_DRAG_HAPPENED, dragActionTypes } from './constants';


export const addCardItem = ({ id, listId, boardId, text }: ICard) => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: ADD_CARD,
      payload: {
        id: `${id}-${listId}`,
        listId: listId,
        boardId: boardId,
        text: text
      }
    });
}

export const moveCardItem = ({
  boardId,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
}: IDrag) => (dispatch: Dispatch<dragActionTypes>) =>{
  dispatch({
    type: CARD_DRAG_HAPPENED,
    payload: {
      boardId,
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId
    }
  })
}

export const removeCardItem = () => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: REMOVE_CARD
    });
}