import { RouteObject } from 'react-router';
import Posts from './pages/Posts';
import { IMenuItem } from '@blog-frontend/shared';

export const Router: RouteObject = {
  path: '/posts',
  element: <Posts />,
};

export const MenuItems: IMenuItem[] = [];

export default Router;
