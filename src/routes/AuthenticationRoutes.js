import { lazy } from 'react';

import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

const AuthLogin = Loadable(
  lazy(() => import('views/pages/authentication/authentication/Login')),
);

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login',
      element: <AuthLogin />,
    },
  ],
};

export default AuthenticationRoutes;
