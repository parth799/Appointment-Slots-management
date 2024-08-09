/* eslint-disable @typescript-eslint/no-explicit-any */

import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './Slice/appointmentSlice';
import appointmentListReducer from './Slice/appointmentListSlice';

const store:any =   configureStore({
  reducer: {
    appointment: appointmentReducer,
    appointmentList: appointmentListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
