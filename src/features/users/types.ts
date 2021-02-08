import { EntityState } from '@reduxjs/toolkit';

export type User = {
  username: string;
  subsribers: string[];
  subscriptions: string[];
  posts: string[];
};

export type AddUserPayload = Pick<User, 'username'>;

export type ActionPostPayload = {
  username: string;
  postId: string;
};

export type SubUserPayload = {
  username: string;
  currentUserName: string;
};

export type setCurrentUserNamePayload = IUsersState['currentUserName'];

export default interface IUsersState extends EntityState<User> {
  currentUserName?: string;
}
