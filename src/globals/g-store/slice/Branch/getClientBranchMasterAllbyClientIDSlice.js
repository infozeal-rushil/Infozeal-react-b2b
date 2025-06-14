import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientBranchMasterAllbyClientID } from '@globals/g-store/Service/branchService';

const initialState = {
  branches: [],
  loading: false,
  error: null
};

export const funcGetClientBranchMasterAllbyClientID = createAsyncThunk(
  'branchMasterAllByClientID/fetch',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getClientBranchMasterAllbyClientID(payload);
      // Adjust the key below to match your API response structure
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to fetch branches by client ID'
      );
    }
  }
);

const getClientBranchMasterAllbyClientIDSlice = createSlice({
  name: 'branchMasterAllByClientID',
  initialState,
  reducers: {
    clearBranchMasterAllByClientIDError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetClientBranchMasterAllbyClientID.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        funcGetClientBranchMasterAllbyClientID.fulfilled,
        (state, action) => {
          state.loading = false;
          state.branches = action.payload;
        }
      )
      .addCase(
        funcGetClientBranchMasterAllbyClientID.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearBranchMasterAllByClientIDError } =
  getClientBranchMasterAllbyClientIDSlice.actions;
export default getClientBranchMasterAllbyClientIDSlice.reducer;
