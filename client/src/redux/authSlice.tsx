import api from '../api/request';
import User from '../Interfaces/User';
import { LOG_SUFFIX, OUT_SUFFIX, POST, REG_SUFFIX } from '../Constant/env';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const postRegister = createAsyncThunk(
  'auth/postRegister',
  async (user: User, thunkAPI: any) => {
    try {
      const result = await api.request(REG_SUFFIX, POST, user);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const postLogin = createAsyncThunk('auth/postLogin', async (user: User, thunkAPI: any) => {
  try {
    const result = await api.request(LOG_SUFFIX, POST, user);
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.data);
  }
});

export const postLogout = createAsyncThunk('auth/postLogout', async (param: any, thunkAPI: any) => {
  try {
    const result = await api.request(OUT_SUFFIX, POST);
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.data);
  }
});

// export const getProfile = createAsyncThunk('auth/getProfile', async (email: string) => {
//   const result = await api.request();
//   return result;
// });

const initialState = {
  loading: false,
  userInfo: null,
  accessToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Register user
    [postRegister.pending]: (state: { loading: boolean; error: any }) => {
      state.loading = true;
      state.error = null;
    },
    [postRegister.fulfilled]: (
      state: { loading: boolean; success: boolean; accessToken: string },
      payload: any
    ) => {
      state.loading = false;
      state.success = true;
      state.accessToken = payload;
      localStorage.setItem('accessToken', payload);
    },
    [postRegister.rejected]: (state: { loading: boolean; error: string }, payload: any) => {
      state.loading = false;
      state.error = payload;
    },

    // Login
    [postLogin.pending]: (state: { loading: boolean; error: any }) => {
      state.loading = true;
      state.error = null;
    },
    [postLogin.fulfilled]: (
      state: { loading: boolean; success: boolean; accessToken: string },
      payload: any
    ) => {
      state.loading = false;
      state.success = true;
      state.accessToken = payload;
      localStorage.setItem('accessToken', payload);
    },
    [postLogin.rejected]: (state: { loading: boolean; error: string }, payload: any) => {
      state.loading = false;
      state.error = payload;
    },

    // Logout
    [postLogout.pending]: (state: { loading: boolean; error: any }) => {
      state.loading = true;
      state.error = null;
    },
    [postLogout.fulfilled]: (state: { loading: boolean; success: boolean }) => {
      state.loading = false;
      state.success = true;
    },
  },
});
const { reducer: authReducer } = authSlice;
export const selectAccessToken = (state: { auth: { accessToken: string } }) => {
  return state.auth.accessToken ?? localStorage.getItem('accessToken');
};

export default authReducer;
