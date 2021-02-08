import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import IUsersState, {
  User,
  AddUserPayload,
  ActionPostPayload,
  SubUserPayload,
  setCurrentUserNamePayload,
} from './types';
import { State } from 'store';

const UsersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.username,
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

const initialState: IUsersState = UsersAdapter.getInitialState({
  currentUserName: undefined,
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<AddUserPayload>) => {
      UsersAdapter.addOne(state, {
        ...action.payload,
        subsribers: [],
        subscriptions: [],
        posts: [],
      });
    },
    addUserPost: (state, action: PayloadAction<ActionPostPayload>) => {
      const { username, postId } = action.payload;
      state.entities[username]?.posts.push(postId);
    },
    deleteUserPost: (state, action: PayloadAction<ActionPostPayload>) => {
      const { username, postId } = action.payload;
      const userPosts = state.entities[username]?.posts;
      const postToDelete = userPosts?.indexOf(postId) as number;
      userPosts?.splice(postToDelete, 1);
    },
    subscribeToUser: (state, action: PayloadAction<SubUserPayload>) => {
      const { currentUserName, username } = action.payload;
      state.entities[currentUserName]?.subscriptions.push(username);
      state.entities[username]?.subsribers.push(currentUserName);
    },
    unsubscribeFromUser: (state, action: PayloadAction<SubUserPayload>) => {
      const { currentUserName, username } = action.payload;

      const subscriptions = state.entities[currentUserName]?.subscriptions as string[];
      const userToUnsubFrom = subscriptions.indexOf(username) as number;
      subscriptions.splice(userToUnsubFrom, 1);

      const subscribers = state.entities[username]?.subsribers as string[];
      const userToUnsub = subscribers.indexOf(currentUserName) as number;
      subscribers.splice(userToUnsub, 1);
    },
    setCurrentUserName: (state, action: PayloadAction<setCurrentUserNamePayload>) => {
      state.currentUserName = action.payload;
    },
  },
});

const usersSelectors = UsersAdapter.getSelectors((state: State) => state.users);
const userSelector = usersSelectors.selectById;
const usersSelector = usersSelectors.selectAll;
const usersMapSelector = usersSelectors.selectEntities;
const currentUserNameSelector = (state: State) => state.users.currentUserName;
const currentUserSelector = createSelector(
  usersMapSelector,
  currentUserNameSelector,
  (usersMap, curUserName) => (curUserName ? usersMap[curUserName] : undefined),
);

export const selectors = {
  user: userSelector,
  users: usersSelector,
  usersMap: usersMapSelector,
  currentUserName: currentUserNameSelector,
  currentUser: currentUserSelector,
};

export const { actions } = usersSlice;

export default usersSlice.reducer;
