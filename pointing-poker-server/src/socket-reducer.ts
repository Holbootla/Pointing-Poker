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
    const issues = [];
    users.push(action.payload.user);
    socket.join(gameID);
    STATE.push({ gameID, users, issues });

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
    STATE[getStateIndex()].users.splice(kickedUserIndex, 1);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
    console.log(STATE, STATE[getStateIndex()].users);
  }

  if (action.type === 'game_name_changed') {
    STATE[getStateIndex()].gameName = action.payload.gameName;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameName/saveNewGameNameAction',
      payload: STATE[getStateIndex()].gameName,
    });
  }

  if (action.type === 'issue_created') {
    STATE[getStateIndex()].issues.push(action.payload.issue);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: STATE[getStateIndex()].issues,
    });
  }

  if (action.type === 'issue_deleted') {
    STATE[getStateIndex()].issues.splice(action.payload, 1);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: STATE[getStateIndex()].issues,
    });
  }

  if (action.type === 'issue_edited') {
    const editedIssueInd = STATE[getStateIndex()].issues.findIndex(
      (item) => item.id === action.payload.issue.id
    );
    STATE[getStateIndex()].issues[editedIssueInd] = action.payload.issue;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: STATE[getStateIndex()].issues,
    });
  }

  if (action.type === 'settings_changed') {
    STATE[getStateIndex()].gameSettings = action.payload.gameSettings;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameSettings/setGameSettings',
      payload: STATE[getStateIndex()].gameSettings,
    });
  }

  if (action.type === 'game_started') {
    io.to(gameID).emit('GAME_STARTED');
  }

  if (action.type === 'game_canceled') {
    io.to(gameID).emit('leave_room');
    io.to(gameID).socketsLeave(gameID);
  }

  // ADD YOUR REDUCER:
}
