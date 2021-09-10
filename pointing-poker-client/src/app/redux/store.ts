import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authPopupSlice } from './reducers/auth-reducer';
import { exampleSlice } from './reducers/example-reducer';
import { kickPopupSlice } from './reducers/kick-reducer';

export const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
    authPopup: authPopupSlice.reducer,
    kickPopup: kickPopupSlice.reducer,
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
