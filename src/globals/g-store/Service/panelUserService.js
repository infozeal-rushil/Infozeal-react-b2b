import { get, post, put, del } from '@src/Axois';

export const AddPannelUserMaster = async userData => {
  try {
    return await post('/login/AddPannelUserMaster', {
      ...userData,
      UserStatus: userData.UserStatus.toString()
    });
  } catch (error) {
    throw new Error(
      error?.response?.data?.responseMessage || 'Failed to create user'
    );
  }
};

export const DeletePannelUserMaster = async userId => {
  try {
    return await del('/login/DeletePannelUserMaster', {
      UserID: userId
    });
  } catch (error) {
    throw new Error(
      error?.response?.data?.responseMessage || 'Failed to delete user'
    );
  }
};

export const GetPannelUserMasterList = async (
  pageNo,
  rowsPerPage,
  searchTerm = '',
  searchTermByCol = '',
  filterStatusActive = '',
  shortByCol = ''
) => {
  return await get('/login/GetPannelUserMasterList', {
    PageNo: pageNo,
    RowsPerPage: rowsPerPage,
    SearchTerm: searchTerm,
    SearchTermByCol: searchTermByCol,
    FilterStatusActive: filterStatusActive,
    ShortbyCol: shortByCol
  });
};

export const UpdatePannelUserMaster = async userData => {
  try {
    return await put('/login/UpdatePannelUserMaster', {
      ...userData,
      UserStatus: userData.UserStatus.toString()
    });
  } catch (error) {
    throw new Error(
      error?.response?.data?.responseMessage || 'Failed to update user'
    );
  }
};
