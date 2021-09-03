import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AuthPopupState {
  authPopupVisible: boolean;
}

const initialState: AuthPopupState = {
  authPopupVisible: false,
};

export const authPopupSlice = createSlice({
  name: 'authPopup',
  initialState,
  reducers: {
    showAuthPopupAction: (state) => {
      state.authPopupVisible = true;
    },
    closeAuthPopupAction: (state) => {
      state.authPopupVisible = false;
    },
  },
});

export const { showAuthPopupAction, closeAuthPopupAction } =
  authPopupSlice.actions;

export const authPopupVisible = (state: RootState): boolean =>
  state.authPopup.authPopupVisible;

export default authPopupSlice.reducer;
