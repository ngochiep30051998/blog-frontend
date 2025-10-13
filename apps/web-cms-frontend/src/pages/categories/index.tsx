import { RouteObject } from 'react-router';
import Categories from './pages/Categories';
import { IMenuItem } from '@blog-frontend/shared';

export const Router: RouteObject = {
  path: '/categories',
  element: <Categories />,
};

export const MenuItems: IMenuItem[] = [];

export default Router;
