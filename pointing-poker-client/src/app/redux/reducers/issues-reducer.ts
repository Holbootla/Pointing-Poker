import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Issue {
  id: number | string;
  title: string;
  link: string;
  priority: string;
  status: 'current' | 'resolved' | 'awaiting';
}

interface IssueState {
  issuePopupVisible: boolean;
  issue: Issue;
  issues: Issue[];
}

const initialState: IssueState = {
  issuePopupVisible: false,
  issue: {
    id: '',
    title: '',
    link: '',
    priority: 'low',
    status: 'awaiting',
  },
  issues: [],
};

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    showIssuePopupAction: (state) => {
      state.issuePopupVisible = true;
    },
    closeIssuePopupAction: (state) => {
      state.issuePopupVisible = false;
    },
    setIdAction: (state, action: PayloadAction<number | string>) => {
      state.issue.id = action.payload;
    },
    setTitleAction: (state, action: PayloadAction<string>) => {
      state.issue.title = action.payload;
    },
    setLinkAction: (state, action: PayloadAction<string>) => {
      state.issue.link = action.payload;
    },
    setPriorityAction: (state, action: PayloadAction<string>) => {
      state.issue.priority = action.payload;
    },
    addIssueAction: (state) => {
      state.issues.push(state.issue);
      state.issuePopupVisible = false;
    },
    setIssuesAction: (state, action: PayloadAction<number>) => {
      state.issues.splice(action.payload, 1);
    },
    addIssueToEditAction: (state, action: PayloadAction<Issue>) => {
      state.issue = action.payload;
    },
    editIssue: (state, action: PayloadAction<number>) => {
      state.issues[action.payload] = state.issue;
    }
  },
});

export const { showIssuePopupAction, closeIssuePopupAction, addIssueAction, setTitleAction, setLinkAction, setPriorityAction, setIdAction, setIssuesAction, addIssueToEditAction, editIssue } =
  issuesSlice.actions;

export default issuesSlice.reducer;
