import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface KickPopupState {
  kickPopupVisible: boolean;
  kickedMemberId: string;
}

const initialState: KickPopupState = {
  kickPopupVisible: false,
  kickedMemberId: '',
};

export const kickPopupSlice = createSlice({
  name: 'kickPopup',
  initialState,
  reducers: {
    showKickPopupAction: (state, action: PayloadAction<string>) => {
      state.kickPopupVisible = true;
      state.kickedMemberId = action.payload;
    },
    closeKickPopupAction: (state) => {
      state.kickPopupVisible = false;
      state.kickedMemberId = '';
    },

  },
});

export const { showKickPopupAction, closeKickPopupAction } =
  kickPopupSlice.actions;

export const kickPopupVisible = (state: RootState): boolean =>
  state.kickPopup.kickPopupVisible;

export default kickPopupSlice.reducer;
