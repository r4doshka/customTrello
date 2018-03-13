import { handleActions } from 'redux-actions';

import * as types from './types';

const initialState = null;

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { currentUser } = action.payload;
      return currentUser || null ;
    },
    [types.PICK_USER]: (state, action) => {
      const { id } = action.payload;
      return id;
    },
    [types.LOGOUT]: (state, action) => {
      return null;
    },
  },
  initialState,
);