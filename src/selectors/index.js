import { createSelector } from 'reselect';

export const currentUserSelector = state => state.users[state.currentUser];