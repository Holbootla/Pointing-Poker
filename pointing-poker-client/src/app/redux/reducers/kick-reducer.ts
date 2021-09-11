import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface KickPopupState {
  kickPopupVisible: boolean;
  kickedName: string;
  kickedSurname: string;
}

interface KickPopupAction {
  type: string;
  payload: { kickedName: string, kickedSurname: string };
}

const initialState: KickPopupState = {
  kickPopupVisible: false,
  kickedName: '',
  kickedSurname: '',
};

export const kickPopupSlice = createSlice({
  name: 'kickPopup',
  initialState,
  reducers: {
    showKickPopupAction: (state, action: KickPopupAction) => {
      state.kickPopupVisible = true;
      state.kickedName = action.payload.kickedName;
      state.kickedSurname = action.payload.kickedSurname;
    },
    closeKickPopupAction: (state) => {
      state.kickPopupVisible = false;
      state.kickedName = '';
      state.kickedSurname = '';
    },
  },
});

export const { showKickPopupAction, closeKickPopupAction } =
  kickPopupSlice.actions;

export const kickPopupVisible = (state: RootState): boolean =>
  state.kickPopup.kickPopupVisible;

export default kickPopupSlice.reducer;
