import { createSlice } from '@reduxjs/toolkit';

interface AuthPopupState {
  isLoading: boolean;
}

const initialState: AuthPopupState = {
  isLoading: false,
};

export const spinnerSlice = createSlice({
  name: 'spinnerSlice',
  initialState,
  reducers: {
    showSpinnerAction: (state) => {
      state.isLoading = true;
    },
    closeSpinnerAction: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showSpinnerAction, closeSpinnerAction } = spinnerSlice.actions;

export default spinnerSlice.reducer;
