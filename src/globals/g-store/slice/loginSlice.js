import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { GetPannelUserLogin } from '../Service/loginService';
import LoginService from '../Service/loginService';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  loading: false,
  error: null
};

export const GetPannelUserLogin = createAsyncThunk(
  'login/GetPannelUserLogin',
  async ({ UserEmail, UserPassword }, { rejectWithValue, dispatch }) => {
    try {
      const res = await LoginService.GetPannelUserLogin(
        UserEmail,
        UserPassword
      );
      if (res.status === 'success') {
        dispatch(handleSaveLoginData(res));
        localStorage.setItem('authToken', res.token);
      } else {
        toast.error(res.error || 'Login failed');
      }
      return res;
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
    handleSaveLoginData: (state, action) => {
      state.user = action.payload || {};
    },
    logout: state => {
      state.user = null;
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(GetPannelUserLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPannelUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(GetPannelUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
