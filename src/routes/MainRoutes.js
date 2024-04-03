import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(
  lazy(() => import('views/dashboard/Default')),
);

const UtilsMaterialIcons = Loadable(
  lazy(() => import('views/utilities/MaterialIcons')),
);
const UtilsTablerIcons = Loadable(
  lazy(() => import('views/utilities/TablerIcons')),
);
const Debtors = Loadable(lazy(() => import('views/debtors')));
const Histories = Loadable(lazy(() => import('views/histories')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'menu',
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'menu',
      children: [
        {
          path: '/menu/debtors',
          element: <Debtors />,
        },
      ],
    },
    {
      path: 'menu',
      children: [
        {
          path: '/menu/histories',
          element: <Histories />,
        },
      ],
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />,
        },
      ],
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />,
        },
      ],
    },
  ],
};

export default MainRoutes;
