import { createAction } from 'redux-actions';
import * as types from './types';

export const loadInitialData = createAction(types.LOAD_INITIAL_DATA);
export const updateColumnHeader = createAction(types.UPDATE_COLUMN_HEADER);
export const createCard = createAction(types.CREATE_CARD);