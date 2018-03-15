import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { cards } = action.payload;
      return cards || {};
    },
    [types.CREATE_CARD]: (state, action) => {
      const { text, CardId, userId } = action.payload;
      return {
        ...state,
        [CardId]: {
          id: CardId,
          name: text,
          description: '',
          comments: [],
          user: userId,
        },
      };
    },
    [types.REMOVE_CARD]: (state, action) => {
      const { cardId } = action.payload;
      const newState = { ...state };
      delete newState[cardId];
      return newState;
    },
    [types.UPDATE_CARD_HEADER]: (state, action) => {
      const { newHeader, id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          name: newHeader,
        },
      };
    },
    [types.CREATE_COMMENT]: (state, action) => {
      const { cardId, newCommentId } = action.payload;
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          comments: [...state[cardId].comments, newCommentId],
        },
      };
    },
    [types.REMOVE_COMMENT]: (state, action) => {
      const { commentId, cardId } = action.payload;
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          comments: [
            ...state[cardId].comments.filter(comment => {
              return comment !== commentId;
            }),
          ],
        },
      };
    },
    [types.EDIT_CARD_DESCRIPTION]: (state, action) => {
      const { text, id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          description: text,
        },
      };
    },
  },
  initialState,
);
