import { Reducer } from 'redux';
import { IList, ADD_LIST, REMOVE_LIST, listActionTypes } from '../actions/constants';

const initialState: IList[] = [

]

export const list: Reducer = (state = initialState, action: listActionTypes) => {
  switch (action.type) {
    case ADD_LIST:
      const title = action.payload.title;
      return [...state, { title }]
    case REMOVE_LIST:
      return state;
    default:
      return state;
  }
};