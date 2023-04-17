import { configureStore } from '@reduxjs/toolkit';
import facultyReducer from './facultySlice';
import majorReducer from './majorSlice';
import studentReducer from './studentSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
    majors: majorReducer,
    faculties: facultyReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
