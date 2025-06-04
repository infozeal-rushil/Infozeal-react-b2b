/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPanelMenuPermMasterbyidArray } from 'globals/store/apiResponseType';
import { getPanelMenuPermMasterbyid } from 'globals/store/Service/menupermisionservice';

interface getPanelMenuPermMasterbyidState {
  data: getPanelMenuPermMasterbyidArray[];
  loading: boolean;
  error: string | null;
}

const initialState: getPanelMenuPermMasterbyidState = {
  data: [],
  loading: false,
  error: null
};

export const funcgetPanelMenuPermMasterbyid = createAsyncThunk(
  'panelUsers/fetchPanelUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPanelMenuPermMasterbyid();
      if (response.status === 'success') {
        return response.data;
      } else {
        return rejectWithValue(response.responseMessage);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const getPanelMenuPermMasterbyidArraySlice = createSlice({
  name: 'getPanelMenuPermMasterbyidArray',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(funcgetPanelMenuPermMasterbyid.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcgetPanelMenuPermMasterbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(funcgetPanelMenuPermMasterbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default getPanelMenuPermMasterbyidArraySlice.reducer;
