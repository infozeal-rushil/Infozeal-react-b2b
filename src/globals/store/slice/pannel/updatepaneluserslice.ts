/* eslint-disable */
import axiosInstance from 'globals/Axois/panel/panelAxois';

export interface UpdateUserResponse {
  status: string;
  responseMessage: string;
  entityID: number;
}

export const updateUserManager = async (userData: {
  UserID: string;
  UserDisplayName: string;
  UserEmail: string;
  UserStatus: boolean;
}): Promise<UpdateUserResponse> => {
  try {
    const response = await axiosInstance.put('/login/UpdatePannelUserMaster', {
      UserID: userData.UserID,
      UserDisplayName: userData.UserDisplayName,
      UserEmail: userData.UserEmail,
      UserStatus: userData.UserStatus.toString()
    });

    return response.data as UpdateUserResponse;
  } catch (error: any) {
    const message =
      error?.response?.data?.responseMessage || 'Failed to update user';
    console.error('Error in updateUserManager:', message);
    throw new Error(message);
  }
};
