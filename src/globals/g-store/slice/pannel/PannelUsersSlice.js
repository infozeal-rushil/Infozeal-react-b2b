import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetPannelUserMasterList } from '@globals/g-store/Service/panelUserService';
const initialState = {
  users: [],
  total: 0,
  loading: false,
  error: null
};
export const funcGetPannelUserMasterList = createAsyncThunk(
  'pannelUsers/fetch',
  async (params, { rejectWithValue }) => {
    console.log('Thunk params:', params);
    try {
      const response = await GetPannelUserMasterList(
        params.pageNo,
        params.rowsPerPage,
        params.searchTerm || '',
        params.searchTermByCol || '',
        params.filterStatusActive || '',
        params.shortByCol || ''
      );
      return {
        users: response.data.PannelUser,
        total: response.data.TotalRecords
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);
export const PannelUsersSlice = createSlice({
  name: 'pannelUsers',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetPannelUserMasterList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcGetPannelUserMasterList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(funcGetPannelUserMasterList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const { clearError } = PannelUsersSlice.actions;
export default PannelUsersSlice.reducer;
