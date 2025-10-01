import React, { Fragment, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router';
import {cache} from '@blog-frontend/core';
import { ACCESS_TOKEN_KEY } from '@blog-frontend/shared';

type Props = {
  children: ReactNode | ReactElement;
}

export const PrivateGuard: React.FC<Props> = ({ children }) => {
  const res = cache.getCache(ACCESS_TOKEN_KEY);
  console.log('PrivateGuard', res);
  return (
    <Fragment>
      {res && res.data ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Navigate to='/login' />
      )}
    </Fragment>
  );
}
