import { handleActions } from 'redux-actions';

import * as types from './types';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { columns } = action.payload;
      return columns || {};
    },
    [types.UPDATE_COLUMN_HEADER]: (state, action) => {
      const { newHeader, id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          name: newHeader,
        },
      };
    },
    [types.CREATE_CARD]: (state, action) => {
      const { columnId, CardId } = action.payload;
     // console.log('idcarti', CardId);
      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          cards: [...state[columnId].cards, CardId],
        },
      };
    },
    [types.REMOVE_CARD]: (state, action) => {
      const { cardId, columnId } = action.payload;
      return {
        ...state,
        [columnId]: {
          ...state[columnId],
          cards: [
            ...state[columnId].cards.filter(card => {
              return card !== cardId;
            }),
          ],
        }
      };
    },
  },
  initialState,
);
