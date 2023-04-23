import api from '../api/request';
import User from '../Interfaces/User';
import { LOG_SUFFIX, OUT_SUFFIX, POST, REG_SUFFIX } from '../Constant/env';
import ErrorMessages from '../Interfaces/ErrorMessages';
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
  errors: {},
  commonError: '',
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Register user
    [postRegister.pending]: (state: { loading: boolean }) => {
      state.loading = true;
    },
    [postRegister.fulfilled]: (
      state: {
        loading: boolean;
        errors: ErrorMessages;
        commonError: string;
        success: boolean;
        accessToken: string;
      },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.success = true;
      state.accessToken = action.payload;
      state.errors = {};
      state.commonError = '';
      localStorage.setItem('accessToken', action.payload);
    },
    [postRegister.rejected]: (
      state: { loading: boolean; commonError: string; errors: ErrorMessages },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.errors = action.payload.errors;
      state.commonError = action.payload.message;
      state.errors = action.payload.errors;
    },

    // Login
    [postLogin.pending]: (state: { loading: boolean }) => {
      state.loading = true;
    },
    [postLogin.fulfilled]: (
      state: {
        loading: boolean;
        commonError: string;
        errors: ErrorMessages;
        success: boolean;
        accessToken: string;
      },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.success = true;
      state.accessToken = action.payload;
      state.errors = {};
      state.commonError = '';
      localStorage.setItem('accessToken', action.payload);
    },
    [postLogin.rejected]: (
      state: { loading: boolean; commonError: string; errors: ErrorMessages },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.commonError = action.payload.message;
      state.errors = action.payload.errors;
    },

    // Logout
    [postLogout.pending]: (state: { loading: boolean }) => {
      state.loading = true;
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
export const selectCommonError = (state: { auth: { commonError: string } }) => {
  return state.auth.commonError;
};

export const selectErrors = (state: { auth: { errors: ErrorMessages } }) => {
  return state.auth.errors;
};

export default authReducer;
