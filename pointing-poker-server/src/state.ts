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

interface IServerState {
  gameID: string;
  users: IUser[];
  gameName?: string;
  issues?: IIssue[];
  gameSettings?: IGameSettings;
  additionalKeys?: string;
}

export const STATE: IServerState[] = [];
