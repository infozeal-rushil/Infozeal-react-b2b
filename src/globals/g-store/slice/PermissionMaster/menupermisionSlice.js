import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPanelMenuPermMasterbyid } from '@globals/g-store/Service/menupermisionservice';

const initialState = {
  loading: false,
  permissions: [],
  error: null
};

export const funcgetPanelMenuPermMasterbyid = createAsyncThunk(
  'permissions/fetch',
  async (pannelUserId, { rejectWithValue }) => {
    try {
      const data = await getPanelMenuPermMasterbyid(pannelUserId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    resetPermissionsState: state => {
      state.loading = false;
      state.permissions = [];
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcgetPanelMenuPermMasterbyid.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcgetPanelMenuPermMasterbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
        state.error = null;
      })
      .addCase(funcgetPanelMenuPermMasterbyid.rejected, (state, action) => {
        state.loading = false;
        state.permissions = [];
        state.error = action.payload;
      });
  }
});

export const { resetPermissionsState } = permissionSlice.actions;
export default permissionSlice.reducer;
