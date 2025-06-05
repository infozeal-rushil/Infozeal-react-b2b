// src/types/permissionTypes.ts
export type PermissionKey =
  | 'Add'
  | 'Edit'
  | 'Delete'
  | 'Print'
  | 'View'
  | 'Execute';

export interface PermissionObject {
  objectName: string;
  permissions: Record<PermissionKey, boolean>;
  bitPanelPermMenuStatus: boolean;
  intPanelMenuID: number;
}

export interface data {
  intPanelMenuID: number;
  strPanelMenuName: string;
  intPanelPermissionId: number | null;
  intPannelUserID: number | null;
  strPermission: string | null;
  bitPanelPermMenuStatus: boolean | null;
  bitCreate: number;
  bitRead: number;
  bitUpdate: number;
  bitDelete: number;
  bitPrint: number;
}

export const transformPanelToPermission = (
  panelPermissions: data[]
): PermissionObject[] => {
  return panelPermissions.map(panel => ({
    objectName: panel.strPanelMenuName,
    permissions: {
      Add: panel.bitCreate === 1,
      Edit: panel.bitUpdate === 1,
      Delete: panel.bitDelete === 1,
      Print: panel.bitPrint === 1,
      View: panel.bitRead === 1,
      Execute: panel.bitPanelPermMenuStatus ?? false
    },
    bitPanelPermMenuStatus: panel.bitPanelPermMenuStatus ?? false,
    intPanelMenuID: panel.intPanelMenuID
  }));
};
