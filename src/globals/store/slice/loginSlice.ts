import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SignInManager, UserMaster } from '../Service/loginService';

interface LoginState {
  user: UserMaster | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null
};

interface LoginParams {
  UserEmail: string;
  UserPassword: string;
}

export const signInUser = createAsyncThunk(
  'login/signInUser',
  async ({ UserEmail, UserPassword }: LoginParams, { rejectWithValue }) => {
    try {
      const user = await SignInManager(UserEmail, UserPassword);
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
      .addCase(signInUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
