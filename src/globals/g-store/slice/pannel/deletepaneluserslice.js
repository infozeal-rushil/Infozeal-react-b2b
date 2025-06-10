import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeletePannelUserMaster } from '@globals/g-store/Service/panelUserService';
const initialState = {
  loading: false,
  success: false,
  error: null
};
export const funcDeletePannelUserMaster = createAsyncThunk(
  'user/delete',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await DeletePannelUserMaster(userId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);
const deleteUserSlice = createSlice({
  name: 'funcDeletePannelUserMaster',
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
      .addCase(funcDeletePannelUserMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcDeletePannelUserMaster.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcDeletePannelUserMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});
export const { resetDeleteUserState } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
