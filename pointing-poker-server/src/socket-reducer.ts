import { Socket } from 'socket.io';
import { io } from './server';

import {
  addIssue,
  addRoundInStatistics,
  addUser,
  addVote,
  avatarUpload,
  changeGameName,
  changeSettings,
  createState,
  deleteIssue,
  editIssue,
  finishRound,
  getState,
  kickUser,
  removeSTate,
  setAllVoteResults,
  setAverageValues,
  setCurrentIssue,
  setCurrentTimer,
  setIssueStatus,
  setMessages,
  setNextIssue,
  setVoteResult,
  startRound,
  updateIssues
} from './mongo';

export async function handleAction(
  socket: Socket,
  action: { type: string; payload: any }
) {

  const gameID = action.payload.gameID.toString();

  /*=====================================================================*/
  /*                               MEMBERS                               */
  /*=====================================================================*/

  if (action.type === 'game_created') {

    socket.join(gameID);
    let newStateFromDb = await createState(gameID, [action.payload.user]);
    if (newStateFromDb.users[0].id === action.payload.user.id && action.payload.avatar) {
      newStateFromDb = await avatarUpload(
        gameID,
        action.payload.user.id,
        action.payload.avatar.name,
        action.payload.avatar.data
      );
    }
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: newStateFromDb.users,
      },
    });
  }

  // if (action.type === 'game_created') {
  //   socket.join(gameID);
  //   const newStateFromDb = await createState(gameID, [action.payload.user]);
  //   }
  //   io.to(gameID).emit('UPDATE_CLIENT', {
  //     type: 'members/setMembersAction',
  //     payload: {
  //       members: newStateFromDb.users,
  //     },
  //   });
  // }

  if (action.type === 'user_connected') {

    socket.join(gameID);

    let newStateFromDb = await addUser(gameID, action.payload.user);
    const newUser = newStateFromDb.users.map((user) => user.id === action.payload.user.id)
    if (newUser && action.payload.avatar) {
      newStateFromDb = await avatarUpload(
        gameID,
        action.payload.user.id,
        action.payload.avatar.name,
        action.payload.avatar.data
      );
    }
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: newStateFromDb.users,
      },
    });
  }

  // if (action.type === 'user_connected') {
  //   socket.join(gameID);
  //   const newStateFromDb = await addUser(gameID, action.payload.user);
  //   io.to(gameID).emit('UPDATE_CLIENT', {
  //     type: 'members/setMembersAction',
  //     payload: {
  //       members: newStateFromDb.users,
  //     },
  //   });
  // }

  // if (action.type === 'user_avatar_uploaded') {
  //   const newStateFromDb = await avatarUpload(
  //     gameID,
  //     action.payload.memberId,
  //     action.payload.avatar.name,
  //     action.payload.avatar.data
  //   );

  //   io.to(gameID).emit('UPDATE_CLIENT', {
  //     type: 'members/setMembersAction',
  //     payload: {
  //       members: newStateFromDb.users,
  //     },
  //   });
  // };


  if (action.type === 'user_kicked') {

    const newStateFromDb = await kickUser(gameID, action.payload.user.id);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: newStateFromDb.users,
      },
    });
    io.to(action.payload.user.id).emit('leave_room');
    io.to(action.payload.user.id).socketsLeave(gameID);
  }

  if (action.type === 'set_vote_result') {

    const newStateFromDb = await setVoteResult(gameID, action.payload.memberId, action.payload.voteResult);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: newStateFromDb.users,
      },
    });
  }

  if (action.type === 'set_all_vote_results') {

    const newStateFromDb = await setAllVoteResults(gameID, action.payload.voteResult);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: newStateFromDb.users,
      },
    });
  }

  /*=====================================================================*/
  /*                               GAME NAME                             */
  /*=====================================================================*/

  if (action.type === 'game_name_changed') {

    const newStateFromDb = await changeGameName(gameID, action.payload.gameName);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameName/saveNewGameNameAction',
      payload: newStateFromDb.gameName,
    });
  }

  /*=====================================================================*/
  /*                                 ISSUES                              */
  /*=====================================================================*/

  if (action.type === 'issue_created') {

    const newStateFromDb = await addIssue(gameID, action.payload.issue);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: newStateFromDb.issues,
    });
  }

  if (action.type === 'issue_deleted') {

    const newStateFromDb = await deleteIssue(gameID, action.payload.idIssueToDelete);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: newStateFromDb.issues,
    });
  }

  if (action.type === 'issue_edited') {

    const newStateFromDb = await editIssue(gameID, action.payload.issue);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: newStateFromDb.issues,
    });
  }

  if (action.type === 'issues_updated') {

    const newStateFromDb = await updateIssues(gameID, action.payload.issuesUpdated);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: newStateFromDb.issues,
    });
  }

  if (action.type === 'set_issue_status') {

    const newStateFromDb = await setIssueStatus(gameID, action.payload.id, action.payload.status);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: newStateFromDb.issues,
    });
  }

  /*=====================================================================*/
  /*                                SETTINGS                             */
  /*=====================================================================*/

  if (action.type === 'settings_changed') {

    const newStateFromDb = await changeSettings(gameID, action.payload.gameSettings);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameSettings/setGameSettings',
      payload: newStateFromDb.gameSettings,
    });

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentTimer',
      payload: newStateFromDb.game.currentTimer,
    });
  }

  /*=====================================================================*/
  /*                              START GAME                             */
  /*=====================================================================*/

  if (action.type === 'game_started') {
    io.to(gameID).emit('GAME_STARTED');
  }

  /*=====================================================================*/
  /*                             CANCEL GAME                             */
  /*=====================================================================*/

  if (action.type === 'game_canceled_admin') {
    io.to(gameID).emit('leave_room');

    removeSTate(gameID);

    io.to(gameID).socketsLeave(gameID);
  }

  if (action.type === 'game_canceled') {

    io.to(socket.id).emit('leave_room');

    const newStateFromDb = await kickUser(gameID, action.payload.memberId);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: newStateFromDb.users,
      },
    });

    io.to(socket.id).socketsLeave(gameID);
  }

  /*=====================================================================*/
  /*                                  GAME                               */
  /*=====================================================================*/

  if (action.type === 'get_current_timer') {

    const newStateFromDb = await getState(gameID);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentTimer',
      payload: newStateFromDb.game.currentTimer,
    });
  }

  if (action.type === 'set_current_timer') {

    const newStateFromDb = await setCurrentTimer(gameID, action.payload.currentTimer);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentTimer',
      payload: newStateFromDb.game.currentTimer,
    });
  }

  if (action.type === 'start_round') {

    const newStateFromDb = await startRound(gameID);

    const payloadToClient = {
      roundStatus: newStateFromDb.game.roundStatus,
      votes: newStateFromDb.game.votes,
      averageValues: newStateFromDb.game.averageValues,
    };

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/startRoundAction',
      payload: payloadToClient,
    });
  }

  if (action.type === 'finish_round') {

    let newStateFromDb = await setAverageValues(gameID);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setAverageValuesAction',
      payload: newStateFromDb.game.averageValues,
    });

    newStateFromDb = await addRoundInStatistics(gameID);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/addRoundInStatisticsAction',
      payload: newStateFromDb.game.statistics,
    });

    newStateFromDb = await finishRound(gameID);

    const payloadToClient = {
      roundStatus: newStateFromDb.game.roundStatus,
      currentIssue: newStateFromDb.game.currentIssue,
      nextIssue: newStateFromDb.game.nextIssue,
      currentTimer: newStateFromDb.game.currentTimer,
    };
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/finishRoundAction',
      payload: payloadToClient,
    });
  }

  if (action.type === 'set_current_issue') {

    const newStateFromDb = await setCurrentIssue(gameID, action.payload.currentIssue);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentIssueAction',
      payload: newStateFromDb.game.currentIssue,
    });
  }

  if (action.type === 'set_next_issue') {

    const newStateFromDb = await setNextIssue(gameID, action.payload.nextIssue);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setNextIssueAction',
      payload: newStateFromDb.game.nextIssue,
    });
  }

  if (action.type === 'add_vote') {

    const newStateFromDb = await addVote(gameID, action.payload.memberId, action.payload.value);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/addVoteAction',
      payload: newStateFromDb.game.votes,
    });
  }

  if (action.type === 'set_average_values') {

    const newStateFromDb = await setAverageValues(gameID);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setAverageValuesAction',
      payload: newStateFromDb.game.averageValues,
    });
  }

  if (action.type === 'add_round_in_statistics') {

    const newStateFromDb = await addRoundInStatistics(gameID);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/addRoundInStatisticsAction',
      payload: newStateFromDb.game.statistics,
    });
  }

  if (action.type === 'stop_game') {
    io.to(gameID).emit('GAME_STOPPED');
  }

  /*=====================================================================*/
  /*                                  CHAT                               */
  /*=====================================================================*/

  if (action.type === 'chat_message') {

    const newStateFromDb = await setMessages(gameID, action.payload.message);

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'chat/setMessagesAction',
      payload: {
        chatHistory: newStateFromDb.chatHistory,
      },
    });
  }
  // ADD YOUR REDUCER:
}
