import { RouteObject } from 'react-router';
import Home from './pages/Home';

import { IMenuItem } from '@blog-frontend/shared';

export const Router: RouteObject = {
  path: '/',
  children: [
    {
      path: 'home',
      element: <Home />
    },
  ],
}

export const MenuItems: IMenuItem[] = [
  // getItem('Trang chủ', RouterUrl.Home, <HomeFilled />, RouterUrl.Home, undefined, <Home />)
]