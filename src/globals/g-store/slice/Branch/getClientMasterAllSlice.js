import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientMasterAll } from '@globals/g-store/Service/branchService';

const initialState = {
  clients: [],
  loading: false,
  error: null
};

export const funcGetClientMasterAll = createAsyncThunk(
  'clientMasterAll/fetch',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getClientMasterAll(payload);
      return response.data || []; // response.data is the array you want
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to fetch all clients'
      );
    }
  }
);

const getClientMasterAllSlice = createSlice({
  name: 'clientMasterAll',
  initialState,
  reducers: {
    clearClientMasterAllError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetClientMasterAll.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcGetClientMasterAll.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload; // action.payload is response.data (an array)
      })
      .addCase(funcGetClientMasterAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearClientMasterAllError } = getClientMasterAllSlice.actions;
export default getClientMasterAllSlice.reducer;
