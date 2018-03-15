import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { users } = action.payload;
      return users || {} ;
    },
    [types.CREATE_USER]: (state, action) => {
      const { fullName, id } = action.payload;
      return {
        ...state,
        [id] : {
          id,
          fullName,
          avatarUrl: '',
        }
      };
    },
  },
  initialState,
);
