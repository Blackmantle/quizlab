import { actions as usersActions, selectors as usersSelectors } from './users';
import { actions as postsActions, selectors as postsSelectors } from './posts';

export const actions = {
  ...usersActions,
  ...postsActions,
};

export const selectors = {
  ...usersSelectors,
  ...postsSelectors,
};
