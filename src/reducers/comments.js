import { handleActions } from 'redux-actions';
import * as types from './types';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_INITIAL_DATA]: (state, action) => {
      const { comments } = action.payload;
      return comments || {};
    },
    [types.CREATE_COMMENT]: (state, action) => {
      const { text, newCommentId, userId } = action.payload;
      return {
        ...state,
        [newCommentId] : {
          id: newCommentId,
          text: text,
          user: userId,
        }
      };
    },
    [types.REMOVE_COMMENT]: (state, action) => {
      const { commentId } = action.payload;
      const newState = {...state};
      delete newState[commentId];
      return newState;
    },
    [types.EDIT_COMMENT]: (state, action) => {
      const { text, commentId } = action.payload;
      return {
        ...state,
        [commentId]:{
          ...state[commentId],
          text: text
        }
      };
    },
  },
  initialState,
);
