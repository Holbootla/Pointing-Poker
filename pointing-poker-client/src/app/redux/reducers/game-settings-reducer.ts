import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameSettingsState {
	cardChange: boolean;
	timerOn: boolean;
	scoreType: string;
	scoreTypeShort: string;
	timerMinutes: string;
	timerSeconds: string;
	cardCover: string,
	cardValues: string[];
}

const initialState: GameSettingsState = {
	cardChange: false,
	timerOn: false,
	scoreType: 'FB',
	scoreTypeShort: 'FB',
	timerMinutes: '00',
	timerSeconds: '00',
	cardCover: '#E42B77',
	cardValues: ['pass', 'break', '0', '1'],
};

export const gameSettingsSlice = createSlice({
	name: 'gameSettings',
	initialState,
	reducers: {
		cardChangeAction: (state) => {
			state.cardChange = !state.cardChange;
		},
		timerOnAction: (state) => {
			state.timerOn = !state.timerOn;
		},
		scoreTypeAction: (state, action: PayloadAction<string>) => {
			state.scoreType = action.payload
			state.scoreTypeShort = action.payload
		},
		scoreTypeShortAction: (state, action: PayloadAction<string>) => {
			state.scoreTypeShort = action.payload
			state.scoreType = action.payload
		},
		timerMinutesAction: (state, action: PayloadAction<string>) => {
			state.timerMinutes = action.payload
		},
		timerSecondsAction: (state, action: PayloadAction<string>) => {
			state.timerSeconds = action.payload
		},
		saveCardCoverAction: (state, action: PayloadAction<string>) => {
			state.cardCover = action.payload

		}
		// saveNewGameNameAction: (state, action: PayloadAction<string>) => {
		// 	state.gameName = action.payload;
		// }
	},
});

export const { cardChangeAction, timerOnAction, scoreTypeAction, scoreTypeShortAction, timerMinutesAction, timerSecondsAction, saveCardCoverAction } = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;