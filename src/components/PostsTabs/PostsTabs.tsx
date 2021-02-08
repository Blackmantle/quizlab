import React from 'react';
import {
  useRouteMatch,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from 'features';
import { postsPathes } from 'App';
import { Box, Tabs, Tab, Link } from '@material-ui/core';
import Posts from 'components/Posts';

function PostsTabs() {
  const match = useRouteMatch();
  const posts = useSelector(selectors.posts);
  const subsPosts = useSelector(selectors.subscriptionPosts);
  const currentUserName = useSelector(selectors.currentUserName) as string;

  return (
    <Box>
      <Box>
        <Tabs
          value={match.path}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            component={RouterLink}
            to={postsPathes[0]}
            value={postsPathes[0]}
            label="Все посты"
          />
          <Tab
            component={RouterLink}
            to={postsPathes[1]}
            value={postsPathes[1]}
            label="Подписки"
          />
        </Tabs>
      </Box>
      <Switch>
        <Route path={postsPathes[0]}>
          <Posts posts={posts} />
        </Route>
        <Route path={postsPathes[1]}>
          <Posts posts={subsPosts || []} />
        </Route>
      </Switch>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link component={RouterLink} to={`/${currentUserName}`}>В профиль</Link>
      </Box>
    </Box>
  );
}

export default PostsTabs;
