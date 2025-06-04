// src/Store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import pannelUsersReducer from 'globals/store/slice/pannel/PannelUsersSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import loginReducer from 'globals/store/slice/loginSlice';
import addUserReducer from 'globals/store/slice/pannel/adduserpanelslice';
import permissionReducer from 'globals/store/slice/PermissionMaster/menupermisionSlice';
import menuPermissionReducer from 'globals/store/slice/getmenupermisiondataslice';
import getPermissionslistReducer from 'globals/store/slice/PermissionMaster/getPermissionslistSlice';
import updatePermissionsReducer from 'globals/store/slice/PermissionMaster/UpdatePanelMenuPermMasterSlice';
export const store = configureStore({
  reducer: {
    pannelUsers: pannelUsersReducer,
    login: loginReducer,
    addUser: addUserReducer,
    permissions: permissionReducer,
    menuPermissions: menuPermissionReducer,
    getPermissionslist: getPermissionslistReducer,
    updatePermissions: updatePermissionsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
