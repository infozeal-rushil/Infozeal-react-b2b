import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { data } from 'components/PermissionMaster/PermissionKey';
import { getPermissionslist } from 'globals/store/Service/menupermisionservice';

interface PermissionState {
  loading: boolean;
  permissions: data[];
  error: string | null;
}

const initialState: PermissionState = {
  loading: false,
  permissions: [],
  error: null
};

export const fetchPermissions = createAsyncThunk(
  'permissions/fetch',
  async (pannelUserId: number, { rejectWithValue }) => {
    try {
      const data = await getPermissionslist(pannelUserId);
      return data; // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
      .addCase(fetchPermissions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
        state.error = null;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.permissions = [];
        state.error = action.payload as string;
      });
  }
});

export const { resetPermissionsState } = permissionSlice.actions;
export default permissionSlice.reducer;
