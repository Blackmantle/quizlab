import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import ScrollToTop from 'components/ScrollToTop';
import Login from 'components/Login';
import PrivateRoute from 'components/PrivateRoute';
import Profile from 'components/Profile';
import PostsTabs from 'components/PostsTabs';
import UserSubs from 'components/UserSubs';

export const postsPathes = ['/posts', '/subscriptions'];
export const userPath = '/:username';
export const userSubsPathes = [`${userPath}/subscriptions`, `${userPath}/subscribers`];

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box p={4}>
        <Box m="0 auto" maxWidth={500}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path={postsPathes}>
              <PostsTabs />
            </PrivateRoute>
            <PrivateRoute path={userPath}>
              <Switch>
                <Route path={userSubsPathes}>
                  <UserSubs />
                </Route>
                <Route>
                  <Profile />
                </Route>
              </Switch>
            </PrivateRoute>
            <Redirect to={postsPathes[0]} />
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
