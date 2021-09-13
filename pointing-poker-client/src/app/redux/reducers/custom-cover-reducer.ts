import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Cover {
	id: number,
	cover: string,
}
interface CustomCoverPopupState {
	customCoverPopupVisible: boolean;
	covers: Cover[],
	prevCardCover: string,
	selectedCoverId: number | null,
}

const initialState: CustomCoverPopupState = {
	customCoverPopupVisible: false,
	covers: [
		{ id: 0, cover: '#A1BB41' },
		{ id: 1, cover: '#60DABF' },
		{ id: 2, cover: '#E42B77' },
	],
	prevCardCover: '',
	selectedCoverId: null,
};

export const customCoverSlice = createSlice({
	name: 'customCoverPopup',
	initialState,
	reducers: {
		showCustomCoverPopupAction: (state) => {
			state.customCoverPopupVisible = true;
		},
		closeCustomCoverPopupAction: (state) => {
			state.customCoverPopupVisible = false;
		},
		savePrevCardCoverAction: (state, action: PayloadAction<string>,) => {
			state.prevCardCover = action.payload;

		},
		addNewCardCoverAction: (state, action: PayloadAction<Cover>) => {
			state.covers.push(action.payload);
			state.selectedCoverId = action.payload.id;
		},
		setCardCoverAction: (state, action: PayloadAction<Cover>) => {
			state.selectedCoverId = action.payload.id;
		},
		setSelectedCardCoverAction: (state, action: PayloadAction<number>) => {
			state.selectedCoverId = action.payload
		}
	}
});

export const { showCustomCoverPopupAction, closeCustomCoverPopupAction, savePrevCardCoverAction, addNewCardCoverAction, setSelectedCardCoverAction } = customCoverSlice.actions;

export default customCoverSlice.reducer;