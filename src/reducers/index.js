import { combineReducers } from 'redux';
import columns from './columns';
import cards from './cards';
import users from './users';
import comments from './comments';
import columnsIds from './columnsIds';
import currentUser from './currentUser';

export default combineReducers({
  columnsIds,
  columns,
  cards,
  users,
  comments,
  currentUser
});