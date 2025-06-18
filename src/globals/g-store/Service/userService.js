import { get, put, post, del } from '@src/Axois';

const subURL = '/ClientUserDBControl/';

export const getClientUserMasterAllbyBranchID = async payload => {
  // payload should be { ClientBranchID: 7 }
  return await get(`${subURL}getClientUserMasterAllbyBranchID`, payload);
};
export const updateClientUserMaster = async payload => {
  return await put(`${subURL}updateClientUserMaster`, payload);
};
export const addClientUserMaster = async payload => {
  return await post(`${subURL}addClientUserMaster`, payload);
};
export const deleteClientUserMaster = async payload => {
  return await del(`${subURL}deleteClientUserMaster`, payload);
};
