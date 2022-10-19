import { createSlice } from '@reduxjs/toolkit';
import { Students } from '../../types/MenuTypes';

//-------------------------------- Action navigate page
const initialState: string = Students;
const navigateSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    navigatePage(state, action) {
      state = action.payload;
    },
  },
});
const { actions, reducer } = navigateSlice;

export const navigatePage = actions;
export default reducer;
