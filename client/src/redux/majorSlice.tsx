import majorApi from '../api/majorApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getMajors = createAsyncThunk('major/getMajors', async (param: any, thunkAPI: any) => {
  const result = await majorApi.getMajors();
  return result;
});

const majorSlice = createSlice({
  name: 'major',
  initialState: {
    majors: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getMajors.pending]: (state: { loading: boolean }) => {
      state.loading = true;
    },

    [getMajors.rejected]: (state: { loading: boolean; error: any }, action: { error: any }) => {
      state.loading = false;
      state.error = action.error;
    },

    [getMajors.fulfilled]: (state: { loading: boolean; majors: any }, action: { payload: any }) => {
      state.loading = false;
      state.majors = action.payload;
    },
  },
});

const { reducer: majorReducer } = majorSlice;

export default majorReducer;
