import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { Post, AddPostPayload, AddLikePayload } from './types';
import { State } from 'store';
import { selectors as userSelectors } from '../users/users';

const sortComparer = (a: Post, b: Post) => b.date - a.date;

const PostsAdapter = createEntityAdapter<Post>({ sortComparer });

const initialState = PostsAdapter.getInitialState();

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<AddPostPayload>) => {
      PostsAdapter.addOne(state, {
        ...action.payload,
        likes: [],
      });
    },
    deletePost: PostsAdapter.removeOne,
    addLike: (state, action: PayloadAction<AddLikePayload>) => {
      const { postId, username } = action.payload;
      state.entities[postId]?.likes.push(username);
    },
    deleteLike: (state, action: PayloadAction<AddLikePayload>) => {
      const { postId, username } = action.payload;
      const likeToDelete = state.entities[postId]?.likes.indexOf(username) as number;
      state.entities[postId]?.likes.splice(likeToDelete, 1);
    },
  },
});

const postsSelectors = PostsAdapter.getSelectors((state: State) => state.posts);
const postsSelector = postsSelectors.selectAll;
const postsMapSelector = postsSelectors.selectEntities;
const userPostsSelector = createSelector(
  postsMapSelector,
  userSelectors.user,
  (postsMap, user) => {
    if (user) {
      return user.posts.map((postId) => postsMap[postId] as Post).sort(sortComparer);
    }
    return [];
  },
);
const subscriptionPostsSelector = createSelector(
  postsMapSelector,
  userSelectors.currentUser,
  userSelectors.usersMap,
  (postsMap, curUser, usersMap) => {
    const subsPosts = curUser?.subscriptions.flatMap((username) => (
      usersMap[username]?.posts.map((postId) => postsMap[postId] as Post) || []
    ));
    return subsPosts?.sort(sortComparer) || [];
  },
);

export const selectors = {
  posts: postsSelector,
  postsMap: postsMapSelector,
  userPosts: userPostsSelector,
  subscriptionPosts: subscriptionPostsSelector,
};

export const { actions } = postsSlice;

export default postsSlice.reducer;
