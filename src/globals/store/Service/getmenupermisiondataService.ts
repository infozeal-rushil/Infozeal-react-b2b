/* eslint-disable */
import axiosInstance from 'globals/Axois/panel/panelAxois';
import { ApiMenuResponse } from 'globals/data/permissiondata/RouteTypes';

// interface PanelMenuItem {
//   bitCreate: number;
//   bitRead: number;
//   bitUpdate: number;
//   bitDelete: number;
//   bitPrint: number;
// }

interface PanelMenuPermissions {
  bitCreate: number;
  bitRead: number;
  bitUpdate: number;
  bitDelete: number;
  bitPrint: number;
}

export async function fetchMenuWithToken(
  userId: number
): Promise<ApiMenuResponse> {
  try {
    const response = await axiosInstance.get(
      `/PanelMenuPerm/getPanelMenuPermMasterforlogin`,
      {
        params: { PannelUserID: userId }
      }
    );

    const responsedata: ApiMenuResponse = response.data;
    localStorage.setItem('panelMenuData', JSON.stringify(responsedata));

    // Extract and store permissions
    const menuData = responsedata.data || [];
    const permissions: PanelMenuPermissions[] = menuData.map(menu => ({
      bitCreate: menu.bitCreate,
      bitRead: menu.bitRead,
      bitUpdate: menu.bitUpdate,
      bitDelete: menu.bitDelete,
      bitPrint: menu.bitPrint
    }));

    localStorage.setItem('panelMenuPermissions', JSON.stringify(permissions));
    // console.log('Extracted Permissions:', permissions);
    return responsedata;
  } catch (error) {
    console.error('Error fetching menu with token:', error);
    throw error;
  }
}
