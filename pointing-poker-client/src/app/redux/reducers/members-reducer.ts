import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Member {
	id: number;
	firstName: string;
	lastName: string;
	jobPosition: string;
	isAdmin: boolean;
	role: 'observer' | 'player';
	voteResult: string;
}

interface MembersState {
	members: Member[];
}

const initialState: MembersState = {
	members: [
		{
			id: 0,
			firstName: 'Name',
			lastName: 'Surname',
			jobPosition: "front-end developer",
			isAdmin: false,
			role: 'player',
			voteResult: '-'
		},
		{
			id: 1,
			firstName: 'Konstantin',
			lastName: 'Djakov',
			jobPosition: "front-end developer",
			isAdmin: true,
			role: 'player',
			voteResult: '-'
		},
		{
			id: 2,
			firstName: 'Nikita',
			lastName: 'Lashch',
			jobPosition: "front-end developer",
			isAdmin: false,
			role: 'player',
			voteResult: '-'
		},
		{
			id: 3,
			firstName: 'Svetlana',
			lastName: 'Leshukova',
			jobPosition: "front-end developer",
			isAdmin: false,
			role: 'player',
			voteResult: '-'
		},
	],
};

export const membersSlice = createSlice({
	name: 'members',
	initialState,
	reducers: {
		getMembersAction: (state, action) => {
			// get members from server
			state.members = action.payload;
		},
		addMemberAction: (state, action) => {
			state.members = [...state.members, action.payload];
		},
		kickMemberAction: (state, action) => {
			state.members = state.members.filter((member) => member.id !== action.payload.id);
		},
		setVoteResultAction: (state, action) => {
			state.members = state.members.map((member) => {
				if (member.id === action.payload.memberId) {
					return { ...member, voteResult: action.payload.voteResult };
				}
				return member;
			})
		},
		setAllVoteResultsAction: (state, action) => {
			state.members = state.members.map((member) => ({ ...member, voteResult: action.payload.voteResult }));
		},
	},
});

export const {
	getMembersAction,
	kickMemberAction,
	addMemberAction,
	setVoteResultAction,
	setAllVoteResultsAction
} = membersSlice.actions;

export const membersState = (state: RootState): MembersState =>
	state.members;

export default membersSlice.reducer;