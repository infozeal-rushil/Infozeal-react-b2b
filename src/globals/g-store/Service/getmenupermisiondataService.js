import axiosInstance from '@src/Axois';

export const getPanelMenuPermMasterforlogin = async userId => {
  try {
    const response = await axiosInstance.get(
      '/PanelMenuPerm/getPanelMenuPermMasterforlogin',
      {
        params: { PannelUserID: userId }
      }
    );
    const responseData = response.data;

    if (responseData.status !== 'success' || !responseData.data) {
      throw new Error(
        responseData.responseMessage || 'Failed to fetch menu permissions'
      );
    }

    // Optionally store in localStorage if needed
    localStorage.setItem('panelMenuData', JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    const message =
      error?.response?.data?.responseMessage || error.message || 'Fetch failed';
    throw new Error(message);
  }
};
