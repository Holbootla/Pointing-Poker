import { Socket } from 'socket.io';
import { io } from './server';
import { STATE } from './state';

export function handleAction(
  socket: Socket,
  action: { type: string; payload: any }
) {
  const getStateIndex = () => {
    return STATE.findIndex((el) => el.gameID === gameID);
  };

  const gameID = action.payload.gameID.toString();

  if (action.type === 'game_created') {
    const users = [];
    users.push(action.payload.user);
    socket.join(gameID);
    STATE.push({ gameID, users });

    // io.to(gameID).emit('UPDATE_CLIENT', {
    //   type: 'slice-name/reducer-name',
    //   payload: {
    //     state: STATE[stateInd]
    //   },
    // });
    console.log(STATE, STATE[getStateIndex()].users);
  }

  // EXAMPLE:
  if (action.type === 'user_connected') {
    socket.join(gameID);
    STATE[getStateIndex()].users.push(action.payload.user);
    // io.to(gameID).emit('UPDATE_CLIENT', {
    //   type: 'slice-name/reducer-name',
    //   payload: {
    //     state: STATE[stateInd]
    //   },
    // });
    console.log(STATE, STATE[getStateIndex()].users);
  }

  // ADD YOUR REDUCER:
}
