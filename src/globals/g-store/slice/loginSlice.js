import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetPannelUserLogin } from '../Service/loginService';

const initialState = {
  user: null,
  loading: false,
  error: null
};

export const funcGetPannelUserLogin = createAsyncThunk(
  'login/funcGetPannelUserLogin',
  async ({ UserEmail, UserPassword }, { rejectWithValue }) => {
    try {
      const user = await GetPannelUserLogin(UserEmail, UserPassword);
      localStorage.setItem('authToken', user.token);
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed'
      );
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcGetPannelUserLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(funcGetPannelUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(funcGetPannelUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
