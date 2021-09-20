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

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
    console.log(STATE, STATE[getStateIndex()].users);
  }

  if (action.type === 'user_connected') {
    socket.join(gameID);
    STATE[getStateIndex()].users.push(action.payload.user);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
    console.log(STATE, STATE[getStateIndex()].users);
  }

  if (action.type === 'user_kicked') {
    const kickedUserIndex = STATE[getStateIndex()].users.findIndex((user) => {
      user.id === action.payload.user.id;
    });
    STATE[getStateIndex()].users.splice(kickedUserIndex);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
    console.log(STATE, STATE[getStateIndex()].users);
  }

  if (action.type === 'game_name_changed') {
    STATE[getStateIndex()].gameName = action.payload;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameName/saveNewGameNameAction',
      payload: STATE[getStateIndex()].gameName,
    });
  }

  // ADD YOUR REDUCER:
}
