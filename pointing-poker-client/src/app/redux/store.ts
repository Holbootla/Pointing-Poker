import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { addCardValuesSlice } from './reducers/add-card-reducer';
import { authPopupSlice } from './reducers/auth-reducer';
import { customCoverSlice } from './reducers/custom-cover-reducer';
import { deleteIssuePopupSlice } from './reducers/delete-issue-reducer';
import { editIssuePopupSlice } from './reducers/edit-issue-reducer';
import { exampleSlice } from './reducers/example-reducer';
import { editNamePopupSlice } from './reducers/game-name-reducer';
import { gameSlice } from './reducers/game-reducer';
import { gameSettingsSlice } from './reducers/game-settings-reducer';
import { issuesSlice } from './reducers/issues-reducer';
import { kickPopupSlice } from './reducers/kick-reducer';
import { membersSlice } from './reducers/members-reducer';

export const store = configureStore({
	reducer: {
		example: exampleSlice.reducer,
		authPopup: authPopupSlice.reducer,
		editNamePopup: editNamePopupSlice.reducer,
		kickPopup: kickPopupSlice.reducer,
		issues: issuesSlice.reducer,
		gameSettings: gameSettingsSlice.reducer,
		customCover: customCoverSlice.reducer,
		addCardValues: addCardValuesSlice.reducer,
    deleteIssuePopup: deleteIssuePopupSlice.reducer,
    editIssuePopup: editIssuePopupSlice.reducer,
    members: membersSlice.reducer,
		game: gameSlice.reducer,
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
