import axiosInstance from '@src/Axois';

export const getPanelMenuPermMasterbyid = async pannelUserId => {
  try {
    const response = await axiosInstance.get(
      `/PanelMenuPerm/getPanelMenuPermMasterbyid`,
      {
        params: {
          PannelUserID: pannelUserId
        }
      }
    );
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const GetPannelUserMasterall = async () => {
  try {
    const response = await axiosInstance.get('/Login/GetPannelUserMasterall');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePanelMenuPermMaster = async payload => {
  try {
    const response = await axiosInstance.put(
      '/PanelMenuPerm/UpdatePanelMenuPermMaster',
      payload
    );
    console.log('Full API response:', response);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};
