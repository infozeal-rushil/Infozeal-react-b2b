import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientUserMasterAllbyBranchID } from '@globals/g-store/Service/userService';

const initialState = {
  users: [],
  loading: false,
  error: null
};

export const funcGetClientUserMasterAllbyBranchID = createAsyncThunk(
  'userMasterAllByBranchID/fetch',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getClientUserMasterAllbyBranchID(payload);
      // API response: { status, responseMessage, data: [...] }
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to fetch users by branch'
      );
    }
  }
);

const getClientUserMasterAllbyBranchIDSlice = createSlice({
  name: 'userMasterAllByBranchID',
  initialState,
  reducers: {
    clearUserMasterAllByBranchIDError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetClientUserMasterAllbyBranchID.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        funcGetClientUserMasterAllbyBranchID.fulfilled,
        (state, action) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        funcGetClientUserMasterAllbyBranchID.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearUserMasterAllByBranchIDError } =
  getClientUserMasterAllbyBranchIDSlice.actions;
export default getClientUserMasterAllbyBranchIDSlice.reducer;
