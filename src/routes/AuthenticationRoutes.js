import { lazy } from "react";

import MinimalLayout from "layout/MinimalLayout";
import Loadable from "ui-component/Loadable";

const AuthLogin = Loadable(lazy(() => import("views/pages/authentication/authentication/Login")));

const AuthenticationRoutes = {
  path: "/login",
  element: <AuthLogin />,
};

export default AuthenticationRoutes;
