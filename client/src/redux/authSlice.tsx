import authApi from "../api/authApi";
import AccessToken from "../Interfaces/AccessToken";
import User from "../Interfaces/User";

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const postRegister = createAsyncThunk(
  'user/postRegister',
  async (user: User) => {
    const result = await authApi.postRegister(user);
    return result;
  }
);

export const postLogin = createAsyncThunk(
  'user/postLogin',
  async (user: User) => {
    const result = await authApi.postLogin(user);
    return result;
  }
);

export const postLogout = createAsyncThunk(
  'user/postLogout',
  async () => {
    const result = await authApi.postLogout();
    return result;
  }
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (email: String) => {
    const result = await authApi.getProfile(email);
    return result;
  }
);

const initialState = {
  loading: false,
  userInfo: null,
  accessToken: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Register user
    [postRegister.pending]: (state: {loading: boolean, error: any}) => {
      state.loading = true;
      state.error = null;
    },
    [postRegister.fulfilled]: (state: {loading: boolean, success: boolean, accessToken: AccessToken}, payload: AccessToken) => {
      state.loading = false;
      state.success = true;
      state.accessToken = payload;
    },
    [postRegister.rejected]: (state: { loading: boolean, error: String}, payload: any) => {
      state.loading = false
      state.error = payload
    },
  },
});
