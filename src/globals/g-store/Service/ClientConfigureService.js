import { post } from '@src/Axois';
import { get } from '@src/Axois';
import { put } from '@src/Axois';

const subURL = '/ClientUserDBControl/';

export const AddClientConfigure = async payload => {
  try {
    const data = await post(`${subURL}AddClientConfigure`, payload);
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
  return await get(`${subURL}getClientConfigureList`, {
    PageNo: pageNo,
    RowsPerPage: rowsPerPage,
    SearchTerm: searchTerm,
    SearchTermByCol: searchTermByCol,
    FilterStatusActive: filterStatusActive,
    ShortbyCol: shortByCol
  });
};

export const getClientMasterByID = async payload => {
  return await get(`${subURL}getClientMasterbyID`, payload);
};

export const updateClientMaster = async payload => {
  return await put(`${subURL}updateClientMaster`, payload);
};
