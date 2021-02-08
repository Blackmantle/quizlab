import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from 'features';
import IProps from './types';

function PrivateRoute({ children, ...rest }: IProps) {
  const currentUserName = useSelector(selectors.currentUserName);

  return (
    <Route
      {...rest}
      render={({ location }) => (
        currentUserName
          ? children
          : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    />
  );
}

export default PrivateRoute;
