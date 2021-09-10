import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IssuePopupState {
  issuePopupVisible: boolean;
}

const initialState: IssuePopupState = {
  issuePopupVisible: false,
};

export const issuePopupSlice = createSlice({
  name: 'issuePopup',
  initialState,
  reducers: {
    showIssuePopupAction: (state) => {
      state.issuePopupVisible = true;
    },
    closeIssuePopupAction: (state) => {
      state.issuePopupVisible = false;
    },
  },
});

export const { showIssuePopupAction, closeIssuePopupAction } =
  issuePopupSlice.actions;

export const kickPopupVisible = (state: RootState): boolean =>
  state.kickPopup.kickPopupVisible;

export default issuePopupSlice.reducer;
