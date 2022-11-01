import studentApi from '../api/studentApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (param: any, thunkAPI: any) => {
    const result = await studentApi.getStudents();
    return result;
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getStudents.pending]: (state: { loading: boolean }) => {
      state.loading = true;
    },

    [getStudents.rejected]: (state: { loading: boolean; error: any }, action: { error: any }) => {
      state.loading = false;
      state.error = action.error;
    },

    [getStudents.fulfilled]: (
      state: { loading: boolean; students: any },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.students = action.payload;
    },
  },
});

const { reducer: studentReducer } = studentSlice;

export default studentReducer;
