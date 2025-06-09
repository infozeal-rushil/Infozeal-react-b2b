// src/Store/Slice/AddUserSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddPannelUserMaster } from '@globals/g-store/Service/panelUserService';

const initialState = {
  loading: false,
  success: false,
  error: null,
  responseMessage: ''
};

export const funcAddPannelUserMaster = createAsyncThunk(
  'funcAddPannelUserMaster/create',
  async (userData, { rejectWithValue }) => {
    try {
      // Use your Axois helper/service here
      const response = await AddPannelUserMaster(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

const AddUserSlice = createSlice({
  name: 'funcAddPannelUserMaster',
  initialState,
  reducers: {
    resetAddUserState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.responseMessage = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcAddPannelUserMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcAddPannelUserMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.responseMessage = action.payload.responseMessage;
      })
      .addCase(funcAddPannelUserMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetAddUserState } = AddUserSlice.actions;
export default AddUserSlice.reducer;
