import axiosInstance from '@src/Axois';

export const funcUpdatePannelUserMaster = async userData => {
  try {
    const response = await axiosInstance.put('/login/UpdatePannelUserMaster', {
      UserID: userData.UserID,
      UserDisplayName: userData.UserDisplayName,
      UserEmail: userData.UserEmail,
      UserStatus: userData.UserStatus.toString()
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.responseMessage || 'Failed to update user';
    console.error('Error in funcUpdatePannelUserMaster:', message);
    throw new Error(message);
  }
};
