import studentApi from '../api/studentApi';
import Student from '../Interfaces/Student';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (param: any, thunkAPI: any) => {
    try {
      const result = await studentApi.getStudents();
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const postStudent = createAsyncThunk(
  'student/postStudent',
  async (data: Student, thunkAPI: any) => {
    try {
      const student = await studentApi.postStudent(data);
      return student;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
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
    [postStudent.rejected]: (state: any, action: any) => {
      state.error = action.payload.error_message;
    },
    [postStudent.fulfilled]: (state: { students: Student[] }, action: { payload: any }) => {
      state.students.push(action.payload);
    },
  },
});

const { reducer: studentReducer } = studentSlice;
export const selectAllStudents = (state: { students: { students: Student[] } }) =>
  state.students.students;
// export const selectAllErrors = (state: { students: { error: any } }) => state.students.error;
export default studentReducer;
