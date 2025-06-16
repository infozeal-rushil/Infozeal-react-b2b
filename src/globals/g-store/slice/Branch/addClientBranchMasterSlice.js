import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addClientBranchMaster } from '@globals/g-store/Service/branchService';

const initialState = {
  loading: false,
  success: false,
  error: null
};

export const funcAddClientBranchMaster = createAsyncThunk(
  'clientBranchMaster/add',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addClientBranchMaster(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to add branch'
      );
    }
  }
);

const addClientBranchMasterSlice = createSlice({
  name: 'addClientBranchMaster',
  initialState,
  reducers: {
    resetAddClientBranchMasterState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcAddClientBranchMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcAddClientBranchMaster.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcAddClientBranchMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetAddClientBranchMasterState } =
  addClientBranchMasterSlice.actions;
export default addClientBranchMasterSlice.reducer;
