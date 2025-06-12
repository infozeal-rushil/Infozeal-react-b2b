import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@globals/g-layouts/MainLayout';
import MainLayoutProvider from '@globals/g-providers/MainLayoutProvider';
import PannelMaster from '@components/panelmaster/PannelMaster';
import SignIn from '@components/login/SignIn';
import App from '@src/App';
import Ecommerce from '@components/dashboard/ecommerce';
import PermissionsMatrix from '@components/PermissionMaster/Pemission';
import ClientCompanyMaster from '@components/clientCompany/clientCompanyMaster';
import ClientMaster from '@components/clientCompany/ClientMaster';

const dynamicRoutes = [
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
  },
  {
    path: '/clientmaster',
    element: <ClientMaster />
  },
  {
    path: '/clientCompanyMaster',
    element: <ClientCompanyMaster />
  }
];

const routes = [
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
