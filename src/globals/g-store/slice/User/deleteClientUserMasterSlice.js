import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteClientUserMaster } from '@globals/g-store/Service/userService'; // Adjust path as necessary

const initialState = {
  loading: false,
  success: false,
  error: null
};

// Async thunk
export const funcDeleteClientUserMaster = createAsyncThunk(
  'clientUser/delete',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await deleteClientUserMaster(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

// Slice
const deleteClientUserSlice = createSlice({
  name: 'deleteClientUserMaster',
  initialState,
  reducers: {
    resetDeleteClientUserState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcDeleteClientUserMaster.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(funcDeleteClientUserMaster.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(funcDeleteClientUserMaster.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

// Exports
export const { resetDeleteClientUserState } = deleteClientUserSlice.actions;
export default deleteClientUserSlice.reducer;
