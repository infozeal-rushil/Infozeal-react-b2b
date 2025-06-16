// src/Store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import pannelUsersReducer from '@globals/g-store/slice/pannel/PannelUsersSlice';
import { useDispatch, useSelector } from 'react-redux';
import loginReducer from '@globals/g-store/slice/loginSlice';
import addUserReducer from '@globals/g-store/slice/pannel/adduserpanelslice';
import permissionReducer from '@globals/g-store/slice/PermissionMaster/menupermisionSlice';
import menuPermissionReducer from '@globals/g-store/slice/getmenupermisiondataslice';
import getPermissionslistReducer from '@globals/g-store/slice/PermissionMaster/getPermissionslistSlice';
import updatePermissionsReducer from '@globals/g-store/slice/PermissionMaster/UpdatePanelMenuPermMasterSlice';
import addClientConfigureReducer from '@globals/g-store/slice/ClientCompanyMaster/ClientConfigureSlice';
import clientConfigureListReducer from '@globals/g-store/slice/ClientCompanyMaster/getClientConfigureListSlice';
import updateClientMasterReducer from '@globals/g-store/slice/ClientCompanyMaster/updateClientMasterSlice';
import getClientMasterByIDReducer from '@globals/g-store/slice/ClientCompanyMaster/getClientMasterByIDSlice';
import getClientBranchMasterAllbyClientIDReducer from '@globals/g-store/slice/Branch/getClientBranchMasterAllbyClientIDSlice';
import getClientMasterAllReducer from '@globals/g-store/slice/Branch/getClientMasterAllSlice';
import getClientUserMasterAllbyBranchIDReducer from '@globals/g-store/slice/User/getClientUserMasterAllbyBranchIDSlice';
export const store = configureStore({
  reducer: {
    pannelUsers: pannelUsersReducer,
    login: loginReducer,
    funcAddPannelUserMaster: addUserReducer,
    permissions: permissionReducer,
    menuPermissions: menuPermissionReducer,
    getPanelMenuPermMasterbyid: getPermissionslistReducer,
    updatePermissions: updatePermissionsReducer,
    addClientConfigure: addClientConfigureReducer,
    clientConfigureList: clientConfigureListReducer,
    updateClientMaster: updateClientMasterReducer,
    clientMasterByID: getClientMasterByIDReducer,
    branchMasterAllByClientID: getClientBranchMasterAllbyClientIDReducer,
    clientMasterAll: getClientMasterAllReducer,
    userMasterAllByBranchID: getClientUserMasterAllbyBranchIDReducer
  }
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export default store;
