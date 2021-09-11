import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AuthPopupState {
  authPopupVisible: boolean;
  gameID: number | '';
  newGame: boolean;
  user: {
    firstName: string | undefined;
    lastName: string | undefined;
    jobPosition: string | undefined;
    isAdmin: boolean;
    role: 'observer' | 'player';
  };
}

const initialState: AuthPopupState = {
  authPopupVisible: false,
  gameID: '',
  newGame: false,
  user: {
    firstName: undefined,
    lastName: undefined,
    jobPosition: undefined,
    isAdmin: false,
    role: 'player',
  },
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
      state.gameID = '';
      state.user = {
        firstName: undefined,
        lastName: undefined,
        jobPosition: undefined,
        isAdmin: false,
        role: 'player',
      };
    },
    setGameIDAction: (state, action) => {
      state.gameID = action.payload;
    },
    setNewGame: (state, action) => {
      state.newGame = action.payload;
    },
    setFirstNameAction: (state, action) => {
      state.user.firstName = action.payload;
    },
    setLastNameAction: (state, action) => {
      state.user.lastName = action.payload;
    },
    setJobPositionAction: (state, action) => {
      state.user.jobPosition = action.payload;
    },
    setIsAdminAction: (state, action) => {
      state.user.isAdmin = action.payload;
    },
    setRoleAction: (state, action) => {
      state.user.role = action.payload;
    },
  },
});

export const {
  showAuthPopupAction,
  closeAuthPopupAction,
  setGameIDAction,
  setNewGame,
  setFirstNameAction,
  setLastNameAction,
  setJobPositionAction,
  setRoleAction,
} = authPopupSlice.actions;

export const authPopupVisible = (state: RootState): boolean =>
  state.authPopup.authPopupVisible;

export default authPopupSlice.reducer;
