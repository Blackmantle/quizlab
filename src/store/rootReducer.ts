import { combineReducers } from '@reduxjs/toolkit';
import users from '../features/users';
import posts from '../features/posts';

const rootReducer = combineReducers({
  users,
  posts,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
