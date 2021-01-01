import {
  ICard,
  cardActionTypes
} from '../actions/constants';

const initialState: ICard[] = [];

export const cardReducer = (state = initialState, action: cardActionTypes) => {
  switch (action.type) {
    // case ADD_CARD: {
    //   const { cardId, listId, text } = action.payload;
    //   const card = {
    //     cardId,
    //     listId,
    //     text
    //   };

    //   return [...state, card];
    // }
    // case EDIT_CARD_TEXT: {
    //   const { cardId, text } = action.payload;
    //   const card = state.find((card: ICard) => card.cardId === cardId);
    //   const cardIndex = state.find((card: ICard) => card.cardId === cardId);

    //   card.text = text;

    //   return [...state.slice(0, cardIndex), card, ...state.slice(cardIndex + 1)];
    // }
    // case REMOVE_CARD:
    //   return state;
    default:
      return state;
  }
}

