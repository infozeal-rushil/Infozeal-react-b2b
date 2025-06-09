import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetPannelUserMasterall } from '@globals/g-store/Service/menupermisionservice';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const funcGetPannelUserMasterall = createAsyncThunk(
  'panelUsers/fetchPanelUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetPannelUserMasterall();
      console.log('Fetched panel users:', response);
      if (response.status === 'success') {
        console.log('Panel users data:', response.data);
        return response.data;
      } else {
        return rejectWithValue(response.responseMessage);
      }
    } catch (error) {
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
      .addCase(funcGetPannelUserMasterall.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcGetPannelUserMasterall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(funcGetPannelUserMasterall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default getPanelMenuPermMasterbyidArraySlice.reducer;
