import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardValue {
	id: string;
	name: string;
	values: string[];
}

export interface AddCardValues {
	addCardValuePopupVisible: boolean;
	cardValues: CardValue[];
	currCardValue: string,
	cardsSelected: string[],
}

const initialState: AddCardValues = {
	addCardValuePopupVisible: false,
	cardValues: [
		{ id: 'FB', name: 'FB', values: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', 'Pass', 'Break'] },
		{ id: 'SP', name: 'SP', values: ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', 'Pass', 'Break'] },
		{ id: 'P2', name: 'P2', values: ['0', '1', '2', '4', '8', '16', '32', '64', '128', '256', '512', '?', 'Pass', 'Break'] }
	],
	currCardValue: '0',
	cardsSelected: ['0'],
}

export const addCardValuesSlice = createSlice({
	name: 'addCardValues',
	initialState,
	reducers: {
		showAddCardValuePopupAction: (state) => {
			state.addCardValuePopupVisible = true;
		},
		closeAddCardValuePopupAction: (state) => {
			state.addCardValuePopupVisible = false;
		},
		saveCurrCardValueAction: (state, action: PayloadAction<string>) => {
			state.currCardValue = action.payload;
		},
		addNewCardValueAction: (state, action: PayloadAction<string>) => {
			state.cardsSelected.push(action.payload);
		},
		cleanCardsSelectedAction: (state) => {
			state.cardsSelected = ['0'];
		}
	}
});

export const { showAddCardValuePopupAction, closeAddCardValuePopupAction, saveCurrCardValueAction, addNewCardValueAction, cleanCardsSelectedAction } = addCardValuesSlice.actions;

export default addCardValuesSlice.reducer;
