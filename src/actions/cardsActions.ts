import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  ICard,
  ADD_CARD,
  REMOVE_CARD,
  cardActionTypes,
  IDrag,
  DRAG_HAPPENED,
  dragActionTypes
} from './constants';


export const addCardItem = ({ listId, text }: ICard) => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: ADD_CARD,
      payload: {
        id: uuidv4(),
        listId: listId,
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
  draggableId,
  type
}: IDrag) => (dispatch: Dispatch<dragActionTypes>) =>{
  dispatch({
    type: DRAG_HAPPENED,
    payload: {
      boardId,
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  })
}

export const removeCardItem = () => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: REMOVE_CARD
    });
}