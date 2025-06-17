import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '@src/Axois';

export const funcAddClientUserMaster = createAsyncThunk(
  'user/addClientUserMaster',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await post(`${subURL}addClientUserMaster`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const addClientUserMasterSlice = createSlice({
  name: 'addClientUserMaster',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    resetAddUserState: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcAddClientUserMaster.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcAddClientUserMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(funcAddClientUserMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add user';
      });
  }
});

export const { resetAddUserState } = addClientUserMasterSlice.actions;
export default addClientUserMasterSlice.reducer;
