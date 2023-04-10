import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from '../api/studentApi';
import ListStudentId from '../Interfaces/ListStudentId';
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

export const putStudent = createAsyncThunk(
  'student/putStudent',
  async (data: Student, thunkAPI: any) => {
    try {
      const result = await studentApi.putStudent(data);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/putStudent',
  async (t_studennt_ids: ListStudentId, thunkAPI: any) => {
    try {
      const result = await studentApi.deleteStudent(t_studennt_ids);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    editStudent: {},
    loading: false,
    error: '',
  },
  reducers: {
    setEditStudent: (state: any, action: any) => {
      state.editStudent = action.payload;
    },
    setLoading: (state: any, action: any) => {
      state.loading = action.payload;
    },
  },
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
      state.students.push(action.payload.data);
    },
    [putStudent.rejected]: (state: any, action: any) => {
      state.error = action.payload.error_message;
    },
    [putStudent.fulfilled]: (state: { students: Student[] }, action: { payload: any }) => {
      let updatedStudent = action.payload;
      let index = state.students.findIndex(
        (student) => student.t_student_id === updatedStudent.t_studennt_id
      );
      state.students[index] = updatedStudent;
    },
    [deleteStudent.fulfilled]: (state: any, action: any) => {
      state.students = state.students.filter(
        (student: Student) => !action.payload.data.includes(student.t_student_id.toString())
      );
    },
  },
});

const { reducer: studentReducer } = studentSlice;
export const { setEditStudent, setLoading } = studentSlice.actions;

export const selectAllStudents = (state: { students: { students: Student[] } }) =>
  state.students.students;
export const selectEditStudent = (state: { students: { editStudent: Student } }) => {
  return state.students.editStudent;
};
export default studentReducer;
