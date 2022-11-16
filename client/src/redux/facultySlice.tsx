import facultyApi from '../api/facultyApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getFaculties = createAsyncThunk(
  'faculty/getFaculties',
  async (param: any, thunkAPI: any) => {
    const result = await facultyApi.getFaculties();
    return result;
  }
);

const facultySlice = createSlice({
  name: 'faculty',
  initialState: {
    faculties: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getFaculties.pending]: (state: { loading: boolean }) => {
      state.loading = true;
    },

    [getFaculties.rejected]: (state: { loading: boolean; error: any }, action: { error: any }) => {
      state.loading = false;
      state.error = action.error;
    },

    [getFaculties.fulfilled]: (
      state: { loading: boolean; faculties: any },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.faculties = action.payload;
    },
  },
});

const { reducer: facultyReducer } = facultySlice;

export default facultyReducer;
