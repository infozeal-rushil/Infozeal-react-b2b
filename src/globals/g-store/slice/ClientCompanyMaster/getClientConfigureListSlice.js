import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientConfigureList } from '@globals/g-store/Service/ClientConfigureService';

const initialState = {
  clients: [],
  total: 0,
  loading: false,
  error: null
};

export const funcGetClientConfigureList = createAsyncThunk(
  'clientConfigureList/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getClientConfigureList(
        params.pageNo,
        params.rowsPerPage,
        params.searchTerm || '',
        params.searchTermByCol || '',
        params.filterStatusActive || '',
        params.shortByCol || ''
      );
      return {
        // Use the correct key from your API response!
        clients: response.data.data || [],
        total: response.data.TotalRecords || 0
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch client list');
    }
  }
);

export const getClientConfigureListSlice = createSlice({
  name: 'clientConfigureList',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetClientConfigureList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcGetClientConfigureList.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload.clients;
        state.total = action.payload.total;
      })
      .addCase(funcGetClientConfigureList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = getClientConfigureListSlice.actions;
export default getClientConfigureListSlice.reducer;
