import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateClientUserMaster } from '@globals/g-store/Service/userService';

const initialState = {
  loading: false,
  success: false,
  error: null
};

export const funcUpdateClientUserMaster = createAsyncThunk(
  'clientUserMaster/update',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateClientUserMaster(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to update client user'
      );
    }
  }
);

const updateClientUserMasterSlice = createSlice({
  name: 'updateClientUserMaster',
  initialState,
  reducers: {
    resetUpdateClientUserMasterState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcUpdateClientUserMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcUpdateClientUserMaster.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcUpdateClientUserMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetUpdateClientUserMasterState } =
  updateClientUserMasterSlice.actions;
export default updateClientUserMasterSlice.reducer;
