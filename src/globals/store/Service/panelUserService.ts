// globals/store/Service/panelUserService.ts
/* eslint-disable */
import { get, post, put, del } from 'globals/Axois/panel/panelAxois';
import { ApiResponse } from '../apiResponseType';

// export interface CreateUserResponse {
//   status: string;
//   responseMessage: string;
//   data: number;
// }

export const createUserManager = async (userData: {
  UserDisplayName: string;
  UserEmail: string;
  UserPassword: string;
  UserStatus: boolean;
}): Promise<ApiResponse> => {
  try {
    return await post<ApiResponse>('/login/AddPannelUserMaster', {
      ...userData,
      UserStatus: userData.UserStatus.toString()
    });
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.responseMessage || 'Failed to create user'
    );
  }
};

// export interface DeleteUserResponse {
//   status: string;
//   responseMessage: string;
//   entityID: number;
// }

export const deleteUserManager = async (
  userId: string
): Promise<ApiResponse> => {
  try {
    return await del<ApiResponse>('/login/DeletePannelUserMaster', {
      UserID: userId
    });
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.responseMessage || 'Failed to delete user'
    );
  }
};

export interface data {
  intPannelUserID: number;
  strPannelUserDisplayName: string;
  strPannelUserEmail: string;
  strPannelUserPassword: string;
  bitPannelUserStatus: boolean;
  RowNum: string;
}

export interface GetPannelUserResponse {
  status: string;
  responseMessage: string;
  data: {
    TotalRecords: number;
    PannelUser: PannelUser[];
  };
}

export interface PannelUser {
  intPannelUserID: number;
  strPannelUserDisplayName: string;
  strPannelUserEmail: string;
  strPannelUserPassword: string;
  bitPannelUserStatus: boolean;
  RowNum: string;
}

export const getPannelUsers = async (
  pageNo: number,
  rowsPerPage: number,
  searchTerm: string = '',
  searchTermByCol: string = '',
  filterStatusActive: string = '',
  shortByCol: string = ''
): Promise<GetPannelUserResponse> => {
  return await get<GetPannelUserResponse>('/login/GetPannelUserMasterList', {
    PageNo: pageNo,
    RowsPerPage: rowsPerPage,
    SearchTerm: searchTerm,
    SearchTermByCol: searchTermByCol,
    FilterStatusActive: filterStatusActive,
    ShortbyCol: shortByCol
  });
};

export interface UpdateUserResponse {
  status: string;
  responseMessage: string;
  data: number;
}

export interface UpdateUserRequest {
  UserID: string;
  UserDisplayName: string;
  UserEmail: string;
  UserStatus: boolean;
}

export const updateUserService = async (
  userData: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  try {
    return await put<UpdateUserResponse>('/login/UpdatePannelUserMaster', {
      ...userData,
      UserStatus: userData.UserStatus.toString()
    });
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.responseMessage || 'Failed to update user'
    );
  }
};
