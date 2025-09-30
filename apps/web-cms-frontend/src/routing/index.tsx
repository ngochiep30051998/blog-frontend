import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as Auth from '../pages/auth';
import * as Home from '../pages/home';
import { IMenuItem } from '@blog-frontend/shared';
import { PrivateGuard } from '../guards/PrivateGuard';
import { PublicGuard } from '../guards/PublicGuard';
import MasterLayout from '../layouts/MasterLayout';
import { AuthLayout } from '../layouts/AuthLayout';


const modules = [
    Home
]

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <PrivateGuard children={<MasterLayout />} />,
                children: []
            },
            {
                element: <PublicGuard children={<AuthLayout />} />,
                children: [
                    Auth.Router
                ]
            },
            {
                element: <PrivateGuard children={<MasterLayout />} />,
                children: [
                    ...modules.map(x => x.Router),
                ]
            },
        ]
    }
], {
    basename: import.meta.env.PUBLIC_URL
})

const Router = () => (
    <RouterProvider
        router={router}
    />
)
export const MenuItems: IMenuItem[] = [
    ...modules.map(x => x.MenuItems).reduce((prev, curr) => prev.concat(curr), [])
];

export default Router;

