import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateClientMaster } from '@globals/g-store/Service/ClientConfigureService';

const initialState = {
  loading: false,
  success: false,
  error: null
};

export const funcUpdateClientMaster = createAsyncThunk(
  'clientMaster/update',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateClientMaster(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.responseMessage ||
        error.message ||
        'Failed to update client'
      );
    }
  }
);

const updateClientMasterSlice = createSlice({
  name: 'updateClientMaster',
  initialState,
  reducers: {
    resetUpdateClientMasterState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcUpdateClientMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcUpdateClientMaster.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcUpdateClientMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetUpdateClientMasterState } = updateClientMasterSlice.actions;
export default updateClientMasterSlice.reducer;