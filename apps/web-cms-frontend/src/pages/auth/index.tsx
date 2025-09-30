import { RouteObject } from 'react-router';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Login from './pages/login/Login';



export const Router: RouteObject = {
  path: '/',
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'forgotPassword',
      element: <ForgotPassword />
    }
  ]
}

