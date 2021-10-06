import { createContext } from 'react';
import io from 'socket.io-client';

export const socket = io('https://blooming-dusk-20813.herokuapp.com/', {
  path: '/api/',
  transports: ['websocket', 'polling'],
});

export const sendToServer = (
  actionType: string,
  payload: unknown
): Promise<null> =>
  new Promise((res) =>
    socket.emit(
      'UPDATE_SERVER',
      {
        type: actionType,
        payload,
      },
      res(null)
    )
  );

export const SocketContext = createContext(socket);
