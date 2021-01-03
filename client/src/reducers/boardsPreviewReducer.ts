import {
  CREATE_BOARD,
  REMOVE_BOARD,
  boardPreviewActionTypes,
  IBoardsPreview,
  FETCH_BOARDS_PREVIEW,
  FETCH_BOARDS_PREVIEW_SUCCESS,
  FETCH_BOARDS_PREVIEW_FAILURE
} from '../actions/constants';

const initialState: IBoardsPreview = {
  loading: false,
  error: false,
  boards: []
};

export const boardPreviewReducer = (state: IBoardsPreview = initialState, action: boardPreviewActionTypes) => {
  switch (action.type) {
    case FETCH_BOARDS_PREVIEW:
      return { loading: true, error: false, boards: [] };
    case FETCH_BOARDS_PREVIEW_SUCCESS:
      return { loading: false, error: false, boards: action.payload };
    case FETCH_BOARDS_PREVIEW_FAILURE:
      return { loading: false, error: true, boards: [] };
    case CREATE_BOARD:
      const { boardId, title: boardTitle } = action.payload
      return { ...state, boards: [...state.boards, { boardId, title: boardTitle }] };
    case REMOVE_BOARD: {
      return state;
    }
    default:
      return state;
  }
}