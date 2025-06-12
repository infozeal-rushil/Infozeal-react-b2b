import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddClientConfigure } from '../../Service/ClientConfigureService';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false
};

export const funcAddClientConfigure = createAsyncThunk(
  'clientCompany/funcAddClientConfigure',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await AddClientConfigure(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Add client configuration failed'
      );
    }
  }
);

export const addClientConfigureSlice = createSlice({
  name: 'addClientConfigure',
  initialState,
  reducers: {
    resetAddClientConfigureState: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcAddClientConfigure.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(funcAddClientConfigure.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(funcAddClientConfigure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetAddClientConfigureState } = addClientConfigureSlice.actions;
export default addClientConfigureSlice.reducer;
