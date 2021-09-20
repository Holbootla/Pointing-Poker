interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isAdmin: boolean;
  role: 'observer' | 'player';
  voteResult?: string;
}

interface IServerState {
  gameID: string;
  users: IUser[];
  gameName?: string;
  additionalKeys?: string;
}

export const STATE: IServerState[] = [];
