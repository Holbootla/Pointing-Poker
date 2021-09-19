import { Socket } from 'socket.io';
import { io } from './server';
import { STATE } from './state';

export function handleAction(
  socket: Socket,
  action: { type: string; payload: any }
) {
  const gameID = action.payload.gameID.toString();

  const stateInd = STATE.findIndex((el) => el.gameID === gameID);

  switch (action.type) {
    case 'game_created':
      socket.join(gameID);
      STATE.push({ gameID });
      const stateInd = STATE.findIndex((el) => el.gameID === gameID);
      io.to(gameID).emit('UPDATE_CLIENT', {
        type: 'authPopup/closeAuthPopupAction',
        payload: {
          state: STATE[stateInd],
        },
      });
      break;

    // EXAMPLE:
    case 'user_connected':
      socket.join(gameID);
      // LOGIC OF ADDING NEW MEMBER IN MEMBERS_LIST:
      // io.to(gameID).emit('UPDATE_CLIENT', {
      //   type: 'slice-name/reducer-name',
      //   payload: {
      //     state: STATE[stateInd]
      //   },
      // });
      break;

    default:
      break;
  }

  // ADD YOUR REDUCER:
}
