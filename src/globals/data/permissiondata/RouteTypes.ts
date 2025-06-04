// Add to types/routeTypes.ts
export interface ApiMenuItem {
  intPanelPermissionId: number;
  intPannelUserID: number;
  strPannelUserDisplayName: string;
  strMenuType: 'M' | 'P';
  strMenuIcon: string;
  intPanelMenuID: number;
  strMunuPage: string;
  intParentPanelMenuID: number;
  intOrderPanelMenuID: number;
  bitPanelMenuStatus: boolean;
  strPermission: string;
  bitCreate: number;
  bitRead: number;
  bitUpdate: number;
  bitDelete: number;
  bitPrint: number;
}

export interface ApiMenuResponse {
  status: string;
  responseMessage: string;
  data: ApiMenuItem[];
}
