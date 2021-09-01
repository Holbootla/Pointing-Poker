import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { exampleSlice } from './reducers/example-reducer';

export const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
