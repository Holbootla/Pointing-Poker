import { createContext } from 'react';
import io from 'socket.io-client';

export const socket = io('http://localhost:3001/', {
  path: '/api/',
  transports: ['websocket', 'polling'],
});

export const sendToServer = (
  actionType: string,
  payload: any,
  callback?: () => any
): void => {
  socket.emit(
    'UPDATE_SERVER',
    {
      type: actionType,
      payload,
    },
    callback && callback()
  );
};

export const SocketContext = createContext(socket);
