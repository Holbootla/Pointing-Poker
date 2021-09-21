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

interface IServerState {
  gameID: string;
  users: IUser[];
  gameName?: string;
  issues?: IIssue[];
  additionalKeys?: string;
}

export const STATE: IServerState[] = [];
