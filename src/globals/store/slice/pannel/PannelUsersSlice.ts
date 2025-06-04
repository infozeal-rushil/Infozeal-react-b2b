/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPannelUsers,
  PannelUser
} from 'globals/store/Service/panelUserService';

interface PannelUsersState {
  users: PannelUser[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: PannelUsersState = {
  users: [],
  total: 0,
  loading: false,
  error: null
};

interface FetchParams {
  pageNo: number;
  rowsPerPage: number;
  searchTerm?: string;
  searchTermByCol?: string;
  filterStatusActive?: string;
  shortByCol?: string;
}

export const fetchPannelUsers = createAsyncThunk(
  'pannelUsers/fetch',
  async (params: FetchParams, { rejectWithValue }) => {
    try {
      const response = await getPannelUsers(
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
    } catch (error: any) {
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
      .addCase(fetchPannelUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPannelUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchPannelUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearError } = PannelUsersSlice.actions;
export default PannelUsersSlice.reducer;
