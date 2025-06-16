import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateClientBranchMaster } from '@globals/g-store/Service/branchService';

const initialState = {
  loading: false,
  success: false,
  error: null
};

export const funcUpdateClientBranchMaster = createAsyncThunk(
  'clientBranchMaster/update',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateClientBranchMaster(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to update branch'
      );
    }
  }
);

const updateClientBranchMasterSlice = createSlice({
  name: 'updateClientBranchMaster',
  initialState,
  reducers: {
    resetUpdateClientBranchMasterState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcUpdateClientBranchMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcUpdateClientBranchMaster.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcUpdateClientBranchMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetUpdateClientBranchMasterState } =
  updateClientBranchMasterSlice.actions;
export default updateClientBranchMasterSlice.reducer;
