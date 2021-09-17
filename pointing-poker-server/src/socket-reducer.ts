import { Socket } from 'socket.io';
import { io } from './server';
import { STATE } from './state';

export function handleAction(
  socket: Socket,
  action: { type: string; payload: any }
) {
  const gameID = action.payload.gameID.toString();

  const stateInd = STATE.findIndex((el) => el.gameID === gameID);

  if (action.type === 'CREATE_GAME') {
    socket.join(gameID);
    STATE.push({ gameID });
    const stateInd = STATE.findIndex((el) => el.gameID === gameID);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'GAME_CREATED',
      payload: {
        state: STATE[stateInd],
        message: `game created with id: ${gameID}`,
      },
    });
  }

  if (action.type === 'CONNECT_GAME') {
    socket.join(gameID);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'GAME_CONNECTED',
      payload: {
        state: STATE[stateInd],
        message: `user connected to game ${gameID}`,
      },
    });
  }

  // ADD YOUR REDUCER:
}
