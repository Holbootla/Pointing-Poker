import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Issue {
  id: number | string;
  title: string;
  link: string;
  priority: string;
  status: 'current' | 'resolved' | 'awaiting' | 'next';
}

interface AverageValue {
  value: string;
  percents: number;
}

interface Vote {
  memberId: number;
  value: string;
}

interface GameState {
  currentIssue: Issue;
  nextIssue: Issue;
  currentTimer: { minutes: number, seconds: number };
  roundStatus: 'in progress' | 'awaiting';
  votes: Vote[];
  averageValues: AverageValue[];
  statistics: { issue: Issue, votes: Vote[], averageValues: AverageValue[] }[];
}

const initialState: GameState = {
  currentIssue: { id: '', title: '', link: '', priority: 'low', status: 'awaiting'},
  nextIssue: { id: '', title: '', link: '', priority: 'low', status: 'awaiting'},
  currentTimer: { minutes: 2, seconds: 0 },
  roundStatus: 'awaiting',
  votes: [{ memberId: 0, value: '5' }, { memberId: 2, value: '5' }, { memberId: 3, value: '8' }],
  averageValues: [],
  statistics: [
    {
      issue: { id: 0, title: 'Title', link: 'link', priority: 'low', status: 'resolved'},
      votes: [{ memberId: 0, value: '5' }, { memberId: 2, value: '5' }, { memberId: 3, value: '8' }],
      averageValues: [{ value: '5', percents: 75 }, { value: '8', percents: 25 }],
    }
  ],
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
      state.votes = initialState.votes;
      state.averageValues = initialState.averageValues;
    },
    finishRoundAction: (state) => {
      state.roundStatus = 'awaiting';
      state.currentIssue = state.nextIssue;
      state.nextIssue = initialState.nextIssue;
      state.currentTimer = initialState.currentTimer;
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
    setAvaregeValuesAction: (state) => {
      const totalVotes = state.votes.length;
      const votesCounter: { [key: string]: number } = {};
      const votesValues: string[] = [];
      const result: { value: string, percents: number }[] = [];
      state.votes.forEach((vote) => {
        if (!votesValues.includes(vote.value)) {
          votesValues.push(vote.value);
          votesCounter[vote.value] = 1;
        } else {
          votesCounter[vote.value] += 1;
        }
      });
      Object.entries(votesCounter)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3)
        .forEach(([voteValue, counter]) => {
          const percents = Math.round(counter / totalVotes * 10000) / 100; 
          result.push({ value: voteValue, percents })
        });
      state.averageValues = result;
    },
    addRoundInStatisticsAction: (state) => {
      state.statistics = [
        ...state.statistics,
        { issue: state.currentIssue, votes: state.votes, averageValues: state.averageValues},
      ];
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
  setAvaregeValuesAction,
  addRoundInStatisticsAction,
} = gameSlice.actions;

export const gameState = (state: RootState): GameState =>
  state.game;

export default gameSlice.reducer;