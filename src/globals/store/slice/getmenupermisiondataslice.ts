/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiMenuResponse } from 'globals/data/permissiondata/RouteTypes';
import { fetchMenuWithToken } from '../Service/getmenupermisiondataService';

interface MenuPermissionState {
  loading: boolean;
  data: ApiMenuResponse | null;
  error: string | null;
}

const initialState: MenuPermissionState = {
  loading: false,
  data: null,
  error: null
};

export const fetchMenuPermissions = createAsyncThunk(
  'menuPermissions/fetch',
  async (
    { userId, token }: { userId: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetchMenuWithToken(userId, token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const menuPermissionSlice = createSlice({
  name: 'menuPermissions',
  initialState,
  reducers: {
    resetMenuPermissionState: state => {
      state.loading = false;
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMenuPermissions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenuPermissions.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload as string;
      });
  }
});

export const { resetMenuPermissionState } = menuPermissionSlice.actions;
export default menuPermissionSlice.reducer;
