import { handleActions } from 'redux-actions';

import * as types from './types';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { comments } = action.payload;
      return comments || {};
    },
  },
  initialState,
);