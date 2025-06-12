import { post } from '@src/Axois';
import { get } from '@src/Axois';
import { put } from '@src/Axois'; // <-- Make sure you have a put method in your Axois.js

export const AddClientConfigure = async payload => {
  try {
    const data = await post('/ClientUserDBControl/AddClientConfigure', payload);
    if (data.status !== 'success' || !data.data) {
      throw new Error(
        data.responseMessage || 'Failed to add client configuration'
      );
    }
    return data.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.responseMessage ||
        error.message ||
        'Add client configuration failed'
    );
  }
};
export const getClientConfigureList = async (
  pageNo,
  rowsPerPage,
  searchTerm = '',
  searchTermByCol = '',
  filterStatusActive = '',
  shortByCol = ''
) => {
  return await get('/ClientUserDBControl/getClientConfigureList', {
    PageNo: pageNo,
    RowsPerPage: rowsPerPage,
    SearchTerm: searchTerm,
    SearchTermByCol: searchTermByCol,
    FilterStatusActive: filterStatusActive,
    ShortbyCol: shortByCol
  });
};
export const getClientMasterByID = async clientID => {
  return await get('/ClientUserDBControl/getClientMasterbyID', {
    ClientID: clientID
  });
};
export const updateClientMaster = async payload => {
  return await put('/ClientUserDBControl/updateClientMaster', payload);
};
