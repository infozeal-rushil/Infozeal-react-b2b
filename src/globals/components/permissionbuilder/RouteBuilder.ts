// components/Permissionbuilder/routeBuilder.ts
import { UilChartPie } from '@iconscout/react-unicons';
import {
  Route,
  RouteItems
} from 'globals/components/routsdeclair/RouteInformation';
import {
  ApiMenuItem,
  ApiMenuResponse
} from 'globals/data/permissiondata/RouteTypes';
import { staticRoutes } from 'sitemap';
import * as Unicons from '@iconscout/react-unicons';
import { fetchMenuWithToken } from 'globals/store/Service/getmenupermisiondataService';
export interface RouteItemInput {
  name: string;
  path?: string;
  pathName?: string;
  topNavIcon?: string | React.ElementType;
  items?: RouteItemInput[];
  icon?: string; //| React.ElementType
  permission?: string;
  active?: boolean;
  type?: 'folder' | 'page';
}
const getIconByName = (name: string): React.ElementType => {
  return (
    (Unicons as Record<string, React.ElementType>)[name] || Unicons.UilFile
  );
};

function buildRouteItem(item: RouteItemInput): Route {
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
    pages: item.items?.map(child => buildRouteItem(child))
  };
}

function buildMenuHierarchy(
  items: ApiMenuItem[],
  parentId: number = 0,
  depth: number = 0
): RouteItemInput[] {
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
      type: item.strMenuType === 'M' ? ('folder' as const) : ('page' as const)
    };
    // console.log(`Built menu item for ${item.strMunuPage}:`, menuItem);
    return menuItem;
  });

  console.groupEnd();
  return result;
}

export async function transformApiResponseToRoutes(
  apiData: ApiMenuResponse
): Promise<RouteItems[]> {
  console.group('Transforming API response to routes');
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

export async function buildDynamicRoutes(): Promise<RouteItems[]> {
  console.group('Building dynamic routes');
  try {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('UserID');
    if (!token || !userId) {
      console.warn('Authentication failed - no token or user ID');
      routes = [];
      throw new Error('Authentication required to load routes');
    }

    const apiData = await fetchMenuWithToken(Number(userId));

    const dynamicRoutes = await transformApiResponseToRoutes(apiData);
    routes = dynamicRoutes;
    return dynamicRoutes;
  } catch (error) {
    console.error('Route building failed, using static routes:', error);
    return [...staticRoutes]; // Return copy of static routes
  } finally {
    console.groupEnd();
  }
}

export let routes: RouteItems[] = [];
