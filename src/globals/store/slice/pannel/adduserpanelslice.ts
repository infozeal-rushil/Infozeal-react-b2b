// src/Store/Slice/AddUserSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from 'globals/store/apiResponseType';
import {
  createUserManager
  // CreateUserResponse
} from 'globals/store/Service/panelUserService';

interface AddUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  responseMessage: string;
}

const initialState: AddUserState = {
  loading: false,
  success: false,
  error: null,
  responseMessage: ''
};

export const addUser = createAsyncThunk(
  'addUser/create',
  async (
    userData: {
      UserDisplayName: string;
      UserEmail: string;
      UserPassword: string;
      UserStatus: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response: ApiResponse = await createUserManager(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

const AddUserSlice = createSlice({
  name: 'addUser',
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
      .addCase(addUser.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.responseMessage = action.payload.responseMessage;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetAddUserState } = AddUserSlice.actions;
export default AddUserSlice.reducer;
