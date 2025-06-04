// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  status: string;
  responseMessage: string;
  data: T;
}
export interface getPanelMenuPermMasterbyidArray {
  intPannelUserID: number;
  strPannelUserDisplayName: string;
  bitPannelUserStatus: boolean;
}
