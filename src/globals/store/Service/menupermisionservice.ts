import { data } from 'components/PermissionMaster/PermissionKey';
import axiosInstance from 'globals/Axois/panel/panelAxois';
import {
  ApiResponse,
  getPanelMenuPermMasterbyidArray
} from '../apiResponseType';

export const getPermissionslist = async (
  pannelUserId: number
): Promise<data[]> => {
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
      return response.data.data as data[];
    } else {
      console.error(
        'Server responded with error:',
        response.data.responseMessage
      );
      return [];
    }
  } catch (error) {
    console.error('Axios error:', error);
    return [];
  }
};

export const getPanelMenuPermMasterbyid = async (): Promise<
  ApiResponse<getPanelMenuPermMasterbyidArray[]>
> => {
  try {
    const response = await axiosInstance.get<
      ApiResponse<getPanelMenuPermMasterbyidArray[]>
    >('/Login/GetPannelUserMasterall');

    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};

export const UpdatePanelMenuPermMaster = async (
  payload: getPanelMenuPermMasterbyidArray[]
): Promise<ApiResponse<getPanelMenuPermMasterbyidArray[]>> => {
  try {
    const response = await axiosInstance.put<
      ApiResponse<getPanelMenuPermMasterbyidArray[]>
    >('/PanelMenuPerm/UpdatePanelMenuPermMaster', payload); // Add payload here

    console.log('Full API response:', response);
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};
