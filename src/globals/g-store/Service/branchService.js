import { get } from '@src/Axois';

const subURL = '/ClientUserDBControl/';

export const getClientBranchMasterAllbyClientID = async payload => {
  return await get(`${subURL}getClientBranchMasterAllbyClientID`, payload);
};
export const getClientMasterAll = async payload => {
  return await get(`${subURL}getClientMasterAll`, payload);
};
