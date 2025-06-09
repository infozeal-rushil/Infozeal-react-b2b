import { get } from '@src/Axois';

export const getPanelMenuPermMasterforlogin = async userId => {
  try {
    return await get('/PanelMenuPerm/getPanelMenuPermMasterforlogin', {
      PannelUserID: userId
    });
  } catch (error) {
    throw new Error(
      error?.response?.data?.responseMessage ||
        'Failed to fetch menu permissions'
    );
  }
};
