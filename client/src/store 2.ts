import { configureStore } from '@reduxjs/toolkit';
import navigateSlice from './redux/actions/navigateSlice';

const store = configureStore({
  reducer: {
    navigate: navigateSlice
  },
});

export default store;