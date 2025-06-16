import { get, put, post } from '@src/Axois';

const subURL = '/ClientUserDBControl/';

export const getClientBranchMasterAllbyClientID = async payload => {
  return await get(`${subURL}getClientBranchMasterAllbyClientID`, payload);
};
export const getClientMasterAll = async payload => {
  return await get(`${subURL}getClientMasterAll`, payload);
};
export const updateClientBranchMaster = async payload => {
  return await put(`${subURL}updateClientBranchMaster`, payload);
};
export const addClientBranchMaster = async payload => {
  return await post(`${subURL}addClientBranchMaster`, payload);
};
