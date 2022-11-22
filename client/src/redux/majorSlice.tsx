import majorApi from '../api/majorApi';
import Major from '../Interfaces/Major';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getMajors = createAsyncThunk(
  'major/getMajors',
  async (t_faculty_id: number, thunkAPI: any) => {
    const result = await majorApi.getMajors(t_faculty_id);
    return result;
  }
);

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

    [getMajors.fulfilled]: (
      state: { loading: boolean; majors: Major[] },
      action: { payload: any }
    ) => {
      state.loading = false;
      state.majors = action.payload;
    },
  },
});

const { reducer: majorReducer } = majorSlice;
export const selectAllMajors = (state: { majors: { majors: Major[] } }) => state.majors.majors;
export default majorReducer;
