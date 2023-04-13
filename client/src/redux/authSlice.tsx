import authApi from '../api/authApi';
import api from '../api/request';
import User from '../Interfaces/User';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const postRegister = createAsyncThunk('user/postRegister', async (user: User) => {
  const result = await authApi.postRegister(user);
  return result;
});

export const postLogin = createAsyncThunk('user/postLogin', async (user: User) => {
  const result = await api.request(process.env.REACT_APP_LOG_SUFFIX, process.env.REACT_APP_POST, user)
  return result;
});

export const postLogout = createAsyncThunk('user/postLogout', async () => {
  const result = await authApi.postLogout();
  return result;
});

export const getProfile = createAsyncThunk('user/getProfile', async (email: string) => {
  const result = await authApi.getProfile(email);
  return result;
});

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
export const selectAccessToken = (state: { accessToken: string }) =>
  state.accessToken;

export default authReducer;