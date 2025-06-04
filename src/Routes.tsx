import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from 'globals/layouts/MainLayout';
import MainLayoutProvider from 'globals/providers/MainLayoutProvider';
import PannelMaster from 'components/panelmaster/PannelMaster';
import SignIn from 'components/login/SignIn';
import App from 'App';
import Ecommerce from 'components/dashboard/ecommerce';
import PermissionsMatrix from 'components/PermissionMaster/Pemission';

type DynamicRoute = {
  path: string;
  element: JSX.Element;
};

const dynamicRoutes: DynamicRoute[] = [
  {
    path: '/Dashboard',
    element: <Ecommerce />
  },
  {
    path: '/panelusermaster',
    element: <PannelMaster />
  },
  {
    path: '/panelpermissionmaster',
    element: <PermissionsMatrix />
  }
];

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <SignIn />
      },
      {
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: dynamicRoutes.map(({ path, element }) => ({
          path,
          element
        }))
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

export default routes;
