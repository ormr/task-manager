import { Reducer } from 'redux';
import {
  ICard,
  ADD_CARD,
  REMOVE_CARD,
  cardActionTypes } from '../actions/constants';

const initialState: ICard[] = [
  {
    id: 'fc7a1576-082e-4e32-b7dd-0432739e44c8',
    listId: '8562308e-d730-44bc-be39-7ad4b0a87b95',
    text: 'Drink coffee'
  },
  {
    id: 'af3754aa-43bc-4030-a872-6689e6d76d4c',
    listId: '8562308e-d730-44bc-be39-7ad4b0a87b95',
    text: 'Solve some problems'
  },
  {
    id: '2515d7ca-32b1-47a7-bc80-5965a1dda153',
    listId: '8562308e-d730-44bc-be39-7ad4b0a87b95',
    text: 'Go to sleep'
  }
];

export const cardReducer: Reducer = (state = initialState, action: cardActionTypes) => {
  switch (action.type) {
    case ADD_CARD: {
      const { id, listId, text } = action.payload;
      const card = {
        id,
        listId,
        text
      };

      return [...state, card];
    }
    case REMOVE_CARD:
      return state;
    default:
      return state;
  }
}

