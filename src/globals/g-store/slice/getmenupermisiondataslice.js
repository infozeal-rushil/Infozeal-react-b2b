import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPanelMenuPermMasterforlogin } from '../Service/getmenupermisiondataService';

const initialState = {
  loading: false,
  data: null,
  error: null
};

export const funcgetPanelMenuPermMasterforlogin = createAsyncThunk(
  'menuPermissions/fetch',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const data = await getPanelMenuPermMasterforlogin(userId);
      localStorage.setItem('panelMenuData', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuPermissionSlice = createSlice({
  name: 'menuPermissions',
  initialState,
  reducers: {
    resetMenuPermissionState: state => {
      state.loading = false;
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(funcgetPanelMenuPermMasterforlogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        funcgetPanelMenuPermMasterforlogin.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(funcgetPanelMenuPermMasterforlogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  }
});

export const { resetMenuPermissionState } = menuPermissionSlice.actions;
export default menuPermissionSlice.reducer;
