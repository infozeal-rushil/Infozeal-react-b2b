import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientMasterByID } from '@globals/g-store/Service/ClientConfigureService';

const initialState = {
  client: null,
  loading: false,
  error: null
};

export const funcGetClientMasterByID = createAsyncThunk(
  'clientMasterByID/fetch',
  async (ClientID, { rejectWithValue }) => {
    try {
      const response = await getClientMasterByID({ ClientID });
      // The data is an array, so return the first item or null
      return (response.data && response.data[0]) || null;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Failed to fetch client by ID'
      );
    }
  }
);

const getClientMasterByIDSlice = createSlice({
  name: 'clientMasterByID',
  initialState,
  reducers: {
    clearClientByIDError: state => {
      state.error = null;
    },
    resetClientByID: state => {
      state.client = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetClientMasterByID.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcGetClientMasterByID.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(funcGetClientMasterByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearClientByIDError, resetClientByID } =
  getClientMasterByIDSlice.actions;
export default getClientMasterByIDSlice.reducer;
