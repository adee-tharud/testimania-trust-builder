
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import testimonialsSlice from './slices/testimonialsSlice';
import widgetSlice from './slices/widgetSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    testimonials: testimonialsSlice,
    widget: widgetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
