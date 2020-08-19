import { Dispatch } from 'redux';
import { ADD_CARD, REMOVE_CARD, cardActionTypes } from './constants';

interface Props {
  title: string
}

export const addCard = ({ title }: Props) => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: ADD_CARD,
      payload: title
    });
}

export const removeCard = () => 
  (dispatch: Dispatch<cardActionTypes>) => {
    dispatch({
      type: REMOVE_CARD
    });
}