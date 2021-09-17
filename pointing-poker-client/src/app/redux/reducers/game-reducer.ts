import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Issue {
  id: number | string;
  title: string;
  link: string;
  priority: string;
  status: 'current' | 'resolved' | 'awaiting';
}

interface GameState {
  currentIssue: Issue;
  nextIssue: Issue;
  currentTimer: { minutes: number, seconds: number };
  roundStatus: 'in progress' | 'awaiting';
  votes: { memberId: number, value: string }[];
  avarageValues: { value: string, percents: number }[];
}

const initialState: GameState = {
  currentIssue: { id: '', title: '', link: '', priority: 'low', status: 'awaiting'},
  nextIssue: { id: '', title: '', link: '', priority: 'low', status: 'awaiting'},
  currentTimer: { minutes: 2, seconds: 0 },
  roundStatus: 'awaiting',
  votes: [],
  avarageValues: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentIssueAction: (state, action) => {
      state.currentIssue = action.payload;
    },
    setNextIssueAction: (state, action) => {
      state.nextIssue = action.payload;
    },
    startRoundAction: (state) => {
      state.roundStatus = 'in progress';
    },
    finishRoundAction: (state) => {
      state.roundStatus = 'awaiting';
      state.currentIssue = state.nextIssue;
      state.nextIssue = initialState.nextIssue;
      state.currentTimer = initialState.currentTimer;
      state.votes = initialState.votes;
      state.avarageValues = initialState.avarageValues;
    },
    setCurrentTimer: (state, action) => {
      state.currentTimer = action.payload;
    },
    addVoteAction: (state, action) => {
      if (state.votes.find((vote) => vote.memberId === action.payload.memberId)) {
        state.votes = state.votes.map((vote) => {
          if (vote.memberId === action.payload.memberId) {
            return { memberId: vote.memberId, value: action.payload.value };
          }
          return vote;
        });
      } else {
        state.votes = [...state.votes, action.payload];
      }
    },
    setAvaregeValuesAction: (state, action) => {
      state.avarageValues = [...state.avarageValues, action.payload];
    },
  },
});

export const {
  startRoundAction,
  finishRoundAction,
  setCurrentIssueAction,
  setNextIssueAction,
  setCurrentTimer,
  addVoteAction,
  setAvaregeValuesAction
} = gameSlice.actions;

export const gameState = (state: RootState): GameState =>
  state.game;

export default gameSlice.reducer;