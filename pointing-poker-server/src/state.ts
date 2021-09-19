interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isAdmin: boolean;
  role: 'observer' | 'player';
}

interface IServerState {
  gameID: string;
  users: IUser[];
  additionalKeys?: string;
}

export const STATE: IServerState[] = [];
