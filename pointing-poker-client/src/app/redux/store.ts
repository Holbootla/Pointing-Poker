import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { addCardValuesSlice } from './reducers/add-card-reducer';
import { authPopupSlice } from './reducers/auth-reducer';
import { customCoverSlice } from './reducers/custom-cover-reducer';
import { exampleSlice } from './reducers/example-reducer';
import { editNamePopupSlice } from './reducers/game-name-reducer';
import { gameSettingsSlice } from './reducers/game-settings-reducer';
import { issuePopupSlice } from './reducers/issue-reducer';
import { kickPopupSlice } from './reducers/kick-reducer';

export const store = configureStore({
	reducer: {
		example: exampleSlice.reducer,
		authPopup: authPopupSlice.reducer,
		editNamePopup: editNamePopupSlice.reducer,
		kickPopup: kickPopupSlice.reducer,
		issuePopup: issuePopupSlice.reducer,
		gameSettings: gameSettingsSlice.reducer,
		customCover: customCoverSlice.reducer,
		addCardValues: addCardValuesSlice.reducer,
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
