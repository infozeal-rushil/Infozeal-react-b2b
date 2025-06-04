/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPanelMenuPermMasterbyidArray } from 'globals/store/apiResponseType';
import { UpdatePanelMenuPermMaster } from 'globals/store/Service/menupermisionservice';
// import { ApiResponse } from 'globals/Interfaces/ApiResponse';
// import { getPanelMenuPermMasterbyidArray } from 'globals/Interfaces/PermissionMasterInterfaces';

interface UpdatePermissionsState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UpdatePermissionsState = {
  loading: false,
  error: null,
  success: false
};

export const funcUpdatePanelMenuPermMaster = createAsyncThunk(
  'permissions/update',
  async (payload: getPanelMenuPermMasterbyidArray[], { rejectWithValue }) => {
    try {
      const response = await UpdatePanelMenuPermMaster(payload); // Pass payload here
      return response.data.toString;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const updatePermissionsSlice = createSlice({
  name: 'updatePermissions',
  initialState,
  reducers: {
    resetUpdateStatus: state => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcUpdatePanelMenuPermMaster.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(funcUpdatePanelMenuPermMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(funcUpdatePanelMenuPermMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetUpdateStatus } = updatePermissionsSlice.actions;
export default updatePermissionsSlice.reducer;
