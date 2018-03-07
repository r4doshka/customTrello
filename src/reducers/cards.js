import { handleActions } from 'redux-actions';
import uuid from 'uuid/v1';
import * as types from './types';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { cards } = action.payload;
      return cards || {};
    },
    [types.CREATE_CARD]: (state, action) => {
      const { text,  CardId } = action.payload;
      return {
        ...state,
        [CardId]: {
          id: CardId,
          name: text,
          description: '',
          comments: [],
          user: uuid(),
        },
      };
    },
  },
  initialState,
);