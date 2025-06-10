import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdatePanelMenuPermMaster } from '@globals/g-store/Service/menupermisionservice';

const initialState = {
  loading: false,
  error: null,
  success: false
};

export const funcUpdatePanelMenuPermMaster = createAsyncThunk(
  'permissions/update',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UpdatePanelMenuPermMaster(payload); // Pass payload here
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
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
        state.error = action.payload;
      });
  }
});

export const { resetUpdateStatus } = updatePermissionsSlice.actions;
export default updatePermissionsSlice.reducer;
