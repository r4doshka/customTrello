import { createAction } from 'redux-actions';
import * as types from './types';

export const loadInitialData = createAction(types.LOAD_INITIAL_DATA);
export const updateColumnHeader = createAction(types.UPDATE_COLUMN_HEADER);
export const createCard = createAction(types.CREATE_CARD);
export const removeCard = createAction(types.REMOVE_CARD);
export const updateCardHeader = createAction(types.UPDATE_CARD_HEADER);
export const createComment = createAction(types.CREATE_COMMENT);
export const removeComment = createAction(types.REMOVE_COMMENT);
export const editComment = createAction(types.EDIT_COMMENT);
export const editCardDescription = createAction(types.EDIT_CARD_DESCRIPTION);
export const createUser = createAction(types.CREATE_USER);
export const pickUser = createAction(types.PICK_USER);
export const logout = createAction(types.LOGOUT);