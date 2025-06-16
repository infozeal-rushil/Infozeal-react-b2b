// components/Permissionbuilder/routeBuilder.ts
import { UilChartPie } from '@iconscout/react-unicons';
import { staticRoutes } from '@src/sitemap';
import * as Unicons from '@iconscout/react-unicons';
import { funcgetPanelMenuPermMasterforlogin } from '@globals/g-store/slice/getmenupermisiondataslice';
import { store } from '@globals/g-store/Index';
function getIconByName(name) {
  return Unicons[name] || Unicons.UilFile;
}
function buildRouteItem(item) {
  var _a;
  // Log the route name here
  // console.log(
  //   'Building route:',
  //   item.name || item.strMunuPage,
  //   'Path:',
  //   item.path
  // );
  return {
    name: item.name,
    path: item.path,
    pathName: item.pathName,
    topNavIcon:
      typeof item.topNavIcon === 'string'
        ? getIconByName(item.topNavIcon)
        : item.topNavIcon,
    icon: item.icon,
    permission: item.permission,
    active: item.active,
    pages:
      (_a = item.items) === null || _a === void 0
        ? void 0
        : _a.map(child => buildRouteItem(child))
  };
}
function buildMenuHierarchy(items, parentId = 0, depth = 0) {
  const filteredItems = items.filter(
    item => item.intParentPanelMenuID === parentId
  );
  const sortedItems = filteredItems.sort(
    (a, b) => a.intOrderPanelMenuID - b.intOrderPanelMenuID
  );
  const result = sortedItems.map(item => {
    const children = buildMenuHierarchy(items, item.intPanelMenuID, depth + 1);
    const menuItem = {
      name: item.strMunuPage,
      path:
        item.strMenuType === 'P'
          ? `/${item.strMunuPage.toLowerCase().replace(/\s+/g, '-')}`
          : undefined,
      pathName: item.strMunuPage.replace(/\s+/g, ''),
      topNavIcon: UilChartPie,
      icon: item.strMenuIcon || 'UilChartPie',
      permission: item.strPermission,
      active: item.bitPanelMenuStatus,
      items: children.length ? children : undefined,
      type: item.strMenuType === 'M' ? 'folder' : 'page'
    };
    // console.log(`Built menu item for ${item.strMunuPage}:`, menuItem);
    return menuItem;
  });
  return result;
}
export function transformApiResponseToRoutes(apiData) {
  try {
    if (!apiData.data) {
      console.error('MenuMaster is missing in API response');
      throw new Error('Invalid API response structure');
    }
    const dashboardItems = buildMenuHierarchy(apiData.data);
    const transformedRoutes = [
      {
        label: 'dashboard',
        horizontalNavLabel: 'home',
        icon: UilChartPie,
        labelDisabled: true,
        pages: dashboardItems.map(item => buildRouteItem(item))
      }
    ];
    return transformedRoutes;
  } catch (error) {
    console.error('Transformation error:', error);
    throw error;
  } finally {
    console.groupEnd();
  }
}
export async function buildDynamicRoutes() {
  // console.group('Building dynamic routes');
  try {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('UserID');
    if (!token || !userId) {
      console.warn('Authentication failed - no token or user ID');
      routes = [];
      throw new Error('Authentication required to load routes');
    }
    // Dispatch the thunk and unwrap the result
    const apiData = await store
      .dispatch(funcgetPanelMenuPermMasterforlogin({ userId: Number(userId) }))
      .unwrap();
    const dynamicRoutes = await transformApiResponseToRoutes(apiData);
    routes = dynamicRoutes;
    return dynamicRoutes;
  } catch (error) {
    console.error('Route building failed, using static routes:', error);
    return [...staticRoutes];
  } finally {
    console.groupEnd();
  }
}
export let routes = [];
