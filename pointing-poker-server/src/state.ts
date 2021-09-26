interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isAdmin: boolean;
  role: 'observer' | 'player';
  voteResult?: string;
}

interface IIssue {
  id: number | string;
  title: string;
  link: string;
  priority: string;
  status: 'current' | 'resolved' | 'awaiting' | 'next';
}

interface IGameSettings {
  cardChange: boolean;
  timerOn: boolean;
  scoreType: string;
  scoreTypeShort: string;
  timerMinutes: string;
  timerSeconds: string;
  cardCover: string;
  cardValuesFinalSet: string[];
  isDefaultSettings: boolean;
}

interface IAverageValue {
  value: string;
  percents: number;
}

interface IVote {
  memberId: number;
  value: string;
}

interface IGameState {
  currentIssue?: IIssue;
  nextIssue?: IIssue;
  currentTimer?: { minutes: number; seconds: number };
  roundStatus?: 'in progress' | 'awaiting';
  votes?: IVote[];
  averageValues?: IAverageValue[];
  statistics?: {
    issue: IIssue;
    votes: IVote[];
    averageValues: IAverageValue[];
  }[];
}

interface IChatMessage {
  userId: string;
  message: string;
  time: string;
  messageId: number;
}

interface IServerState {
  gameID: string;
  users: IUser[];
  gameName?: string;
  issues?: IIssue[];
  gameSettings?: IGameSettings;
  additionalKeys?: string;
  game?: IGameState;
  chatHistory?: IChatMessage[];
}

export const STATE: IServerState[] = [];
