import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import order from './order/slice';

export const store = configureStore({
  reducer: {
    order,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
