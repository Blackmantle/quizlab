import React from 'react';
import {
  useParams,
  useRouteMatch,
  useHistory,
  Redirect,
  Link as RouterLink,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from 'features';
import { UserParams } from '../Profile/types';
import { State } from 'store';
import { userSubsPathes } from 'App';
import { Box, Button, Link, Divider, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

function UserSubs() {
  const { username } = useParams<UserParams>();
  const user = useSelector((state: State) => selectors.user(state, username));

  if (!user) {
    return <Redirect to="/posts" />;
  }

  const match = useRouteMatch();
  const history = useHistory();

  function goBack() {
    history.push(`/${username}`);
  }

  const data = {
    [userSubsPathes[0]]: {
      subs: user.subscriptions,
      msg: 'Нет подписок',
    },
    [userSubsPathes[1]]: {
      subs: user.subsribers,
      msg: 'Нет подписчиков',
    },
  };

  const { subs, msg } = data[match.path];

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={goBack}>Назад</Button>
      <Box>
        {subs.length > 0 ? (
          subs.map((sub) => (
            <React.Fragment key={sub}>
              <Box p={2}>
                <Link
                  component={RouterLink}
                  to={{
                    pathname: `/${sub}`,
                    state: {
                      from: match.url,
                    },
                  }}
                >
                  {sub}
                </Link>
              </Box>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography align="center">{msg}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default UserSubs;
