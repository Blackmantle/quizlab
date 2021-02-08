import React, { useState } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  Redirect,
  Link as RouterLink,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'features';
import { getPluralFunc } from 'plural-forms';
import { State } from 'store';
import { UserParams, LocationState } from './types';
import { Box, Link, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import Posts from 'components/Posts';
import AddPostDialog from 'components/AddPostDialog';

function Profile() {
  const { username } = useParams<UserParams>();
  const user = useSelector((state: State) => selectors.user(state, username));

  if (!user) {
    return <Redirect to="/posts" />;
  }

  const location = useLocation<LocationState>();
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentUser = useSelector(selectors.currentUser);
  const currentUserName = useSelector(selectors.currentUserName) as string;
  const userPosts = useSelector((state: State) => selectors.userPosts(state, username));
  const dispatch = useDispatch();

  function onExit() {
    dispatch(actions.setCurrentUserName(undefined));
  }

  function onSubscribe() {
    dispatch(actions.subscribeToUser({ currentUserName, username }));
  }

  function onUnsubscribe() {
    dispatch(actions.unsubscribeFromUser({ currentUserName, username }));
  }

  function onPostAdd() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  const from = location.state?.from;
  function goBack() {
    if (from) {
      history.push(from);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = getPluralFunc('ru') as any;
  const subscriptionsNumber = user.subscriptions.length;
  const subscribersNumber = user.subsribers.length;
  const subscriptionsPlural = fn(subscriptionsNumber, ['подписка', 'подписки', 'подписок']);
  const subscribersPlural = fn(subscribersNumber, ['подписчик', 'подписчика', 'подписчиков']);

  const isCurrentUser = username === currentUserName;
  const isSubscribed = currentUser?.subscriptions.includes(username);

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box component="span" mr={1}>{`${username},`}</Box>
        <Box component="span" mr={1}>
          <Link component={RouterLink} to={`/${username}/subscriptions`}>
            {`${subscriptionsNumber}  ${subscriptionsPlural}`}
          </Link>
          {', '}
        </Box>
        <span>
          <Link component={RouterLink} to={`/${username}/subscribers`}>
            {`${subscribersNumber} ${subscribersPlural}`}
          </Link>
        </span>
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        {from && (
          <Box mr={2}>
            <Button startIcon={<ArrowBack />} onClick={goBack}>Назад</Button>
          </Box>
        )}
        {isCurrentUser ? (
          <Button variant="contained" color="primary" onClick={onExit}>Выйти</Button>
        ) : isSubscribed ? (
          <Button variant="contained" color="secondary" onClick={onUnsubscribe}>Отписаться</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={onSubscribe}>Подписаться</Button>
        )}
      </Box>
      <Posts posts={userPosts} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link component={RouterLink} to="/posts">В ленту</Link>
        {isCurrentUser && (
          <Box ml={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onPostAdd}
            >
              Добавить пост
            </Button>
          </Box>
        )}
      </Box>
      <AddPostDialog
        username={username}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </Box>
  );
}

export default Profile;
