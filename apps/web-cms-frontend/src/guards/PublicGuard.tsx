import React, { Fragment, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { cache } from '@blog-frontend/core';
import { ACCESS_TOKEN_KEY } from '@blog-frontend/shared';

type Props = {
  children: ReactNode | ReactElement;
}

export const PublicGuard: React.FC<Props> = ({ children }) => {
  const res = cache.getCache(ACCESS_TOKEN_KEY);

  console.log('PublicGuard', res);
  return (
    <Fragment>
      {res && res.data ? (
        <Navigate to='/home' />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
}
