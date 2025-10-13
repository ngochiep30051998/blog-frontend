import { RouteObject } from 'react-router';
import Settings from './pages/Settings';
import { IMenuItem } from '@blog-frontend/shared';

export const Router: RouteObject = {
  path: '/settings',
  element: <Settings />,
};

export const MenuItems: IMenuItem[] = [];

export default Router;
