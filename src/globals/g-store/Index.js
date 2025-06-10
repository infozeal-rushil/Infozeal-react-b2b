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
export const store = configureStore({
  reducer: {
    pannelUsers: pannelUsersReducer,
    login: loginReducer,
    funcAddPannelUserMaster: addUserReducer,
    permissions: permissionReducer,
    menuPermissions: menuPermissionReducer,
    getPanelMenuPermMasterbyid: getPermissionslistReducer,
    updatePermissions: updatePermissionsReducer
  }
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export default store;
