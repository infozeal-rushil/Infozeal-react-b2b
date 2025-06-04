/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUserManager } from 'globals/store/Service/panelUserService';

interface DeleteUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteUserState = {
  loading: false,
  success: false,
  error: null
};

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await deleteUserManager(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {
    resetDeleteUserState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetDeleteUserState } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
