import { createContext } from 'react';
import io from 'socket.io-client';

export const socket = io('http://localhost:3001/', {
  path: '/api/',
  transports: ['websocket', 'polling'],
});

export const SocketContext = createContext(socket);
