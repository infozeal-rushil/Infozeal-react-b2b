// File: deleteBranchSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteClientBranchMaster } from '@globals/g-store/Service/branchService'; // Adjust path as needed

const initialState = {
  loading: false,
  success: false,
  error: null
};
// Async thunk
export const funcDeleteClientBranchMaster = createAsyncThunk(
  'branch/delete',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await deleteClientBranchMaster(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

// Slice
const deleteBranchSlice = createSlice({
  name: 'deleteClientBranchMaster',
  initialState,
  reducers: {
    resetDeleteBranchState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcDeleteClientBranchMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcDeleteClientBranchMaster.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcDeleteClientBranchMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

// Exports
export const { resetDeleteBranchState } = deleteBranchSlice.actions;
export default deleteBranchSlice.reducer;
