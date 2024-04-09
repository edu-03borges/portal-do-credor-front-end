import { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

const DashboardDefault = Loadable(lazy(() => import("views/dashboard/Default")));

const Debtors = Loadable(lazy(() => import("views/debtors")));
const Histories = Loadable(lazy(() => import("views/histories")));
const Titles = Loadable(lazy(() => import("views/titles")));
const Accountability = Loadable(lazy(() => import("views/accountability")));
const Returns = Loadable(lazy(() => import("views/returns")));
const BorderosForBilling = Loadable(lazy(() => import("views/borderosForBilling")));
const DocumentQuery = Loadable(lazy(() => import("views/documentQuery")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/menu",
      children: [
        {
          path: "dashboard",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/debtors",
          element: <Debtors />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/histories",
          element: <Histories />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/titles",
          element: <Titles />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/accountability",
          element: <Accountability />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/returns",
          element: <Returns />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/borderos_for_billing",
          element: <BorderosForBilling />,
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/menu/document_query",
          element: <DocumentQuery />,
        },
      ],
    },
  ],
};

export default MainRoutes;
