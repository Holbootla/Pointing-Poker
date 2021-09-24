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

  /*=====================================================================*/
  /*                               MEMBERS                               */
  /*=====================================================================*/

  if (action.type === 'game_created') {
    const users = [];
    const issues = [];

    users.push(action.payload.user);
    socket.join(gameID);
    STATE.push({ gameID, users, issues });
    STATE[getStateIndex()].game = { votes: [], averageValues: [], statistics: []};

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

  if (action.type === 'set_vote_result') {
    STATE[getStateIndex()].users = STATE[getStateIndex()].users.map((member) => {
      if (member.id === action.payload.memberId) {
        return { ...member, voteResult: action.payload.voteResult };
      }
      return member;
    });
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
  }

  if (action.type === 'set_all_vote_results') {
    STATE[getStateIndex()].users = STATE[getStateIndex()].users.map((member) => ({
      ...member,
      voteResult: action.payload.voteResult,
    }));
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
  }

  /*=====================================================================*/
  /*                               GAME NAME                             */
  /*=====================================================================*/

  if (action.type === 'game_name_changed') {
    STATE[getStateIndex()].gameName = action.payload.gameName;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameName/saveNewGameNameAction',
      payload: STATE[getStateIndex()].gameName,
    });
  }

  /*=====================================================================*/
  /*                                 ISSUES                              */
  /*=====================================================================*/

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

  if (action.type === 'set_issue_status') {
    STATE[getStateIndex()].issues = STATE[getStateIndex()].issues.map((issue) => {
      if (issue.id === action.payload.id) {
        return { ...issue, status: action.payload.status }
      }
      if (issue.status === 'current' && action.payload.status !== 'next') {
        return { ...issue, status: 'awaiting' }
      }
      if (issue.status === 'next') {
        return { ...issue, status: 'awaiting' }
      }
      return issue;
    });

    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'issues/updateIssuesAction',
      payload: STATE[getStateIndex()].issues,
    });
  }

  /*=====================================================================*/
  /*                                SETTINGS                             */
  /*=====================================================================*/

  if (action.type === 'settings_changed') {
    STATE[getStateIndex()].gameSettings = action.payload.gameSettings;
    const minutes = Number(action.payload.gameSettings.timerMinutes);
    const seconds = Number(action.payload.gameSettings.timerSeconds);
    STATE[getStateIndex()].game.currentTimer = { minutes, seconds };
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'gameSettings/setGameSettings',
      payload: STATE[getStateIndex()].gameSettings,
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
    STATE[getStateIndex()].users = [];
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
    io.to(gameID).socketsLeave(gameID);
  }

  if (action.type === 'game_canceled') {
    io.to(socket.id).emit('leave_room');
    const kickedUserIndex = STATE[getStateIndex()].users.findIndex((user) => {
      user.id === action.payload.memberId;
    });
    STATE[getStateIndex()].users.splice(kickedUserIndex, 1);
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'members/setMembersAction',
      payload: {
        members: STATE[getStateIndex()].users,
      },
    });
    io.to(socket.id).socketsLeave(gameID);
  }

  /*=====================================================================*/
  /*                                  GAME                               */
  /*=====================================================================*/

  if (action.type === 'get_current_timer') {
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentTimer',
      payload: STATE[getStateIndex()].game.currentTimer,
    });
  }

  if (action.type === 'set_current_timer') {
    STATE[getStateIndex()].game.currentTimer = action.payload.currentTimer;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentTimer',
      payload: STATE[getStateIndex()].game.currentTimer,
    });
  }

  if (action.type === 'start_round') {
    STATE[getStateIndex()].game.roundStatus = 'in progress';
    STATE[getStateIndex()].game.votes = [];
    STATE[getStateIndex()].game.averageValues = [];
    const payloadToClient = { 
      roundStatus: STATE[getStateIndex()].game.roundStatus,
      votes: STATE[getStateIndex()].game.votes,
      averageValues: STATE[getStateIndex()].game.averageValues
    };
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/startRoundAction',
      payload: payloadToClient,
    });
  }

  if (action.type === 'finish_round') {
    STATE[getStateIndex()].game.roundStatus = 'awaiting';
    STATE[getStateIndex()].game.currentIssue = STATE[getStateIndex()].game.nextIssue;
    STATE[getStateIndex()].game.nextIssue = { id: '', title: '', link: '', priority: 'low', status: 'awaiting'};
    const minutes = Number(STATE[getStateIndex()].gameSettings.timerMinutes);
    const seconds = Number(STATE[getStateIndex()].gameSettings.timerSeconds);
    STATE[getStateIndex()].game.currentTimer = { minutes, seconds };
    const payloadToClient = { 
      roundStatus: STATE[getStateIndex()].game.roundStatus,
      currentIssue: STATE[getStateIndex()].game.currentIssue,
      nextIssue: STATE[getStateIndex()].game.nextIssue,
      currentTimer: STATE[getStateIndex()].game.currentTimer,
    };
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/finishRoundAction',
      payload: payloadToClient,
    });
  }

  if (action.type === 'set_current_issue') {
    STATE[getStateIndex()].game.currentIssue = action.payload.currentIssue;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setCurrentIssueAction',
      payload: STATE[getStateIndex()].game.currentIssue,
    });
  }

  if (action.type === 'set_next_issue') {
    STATE[getStateIndex()].game.nextIssue = action.payload.nextIssue;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setNextIssueAction',
      payload: STATE[getStateIndex()].game.nextIssue,
    });
  }

  if (action.type === 'add_vote') {
    if (STATE[getStateIndex()].game.votes.find((vote) => vote.memberId === action.payload.memberId)) {
      STATE[getStateIndex()].game.votes = STATE[getStateIndex()].game.votes.map((vote) => {
        if (vote.memberId === action.payload.memberId) {
          return { memberId: vote.memberId, value: action.payload.value };
        }
        return vote;
      });
    } else {
      STATE[getStateIndex()].game.votes = [...STATE[getStateIndex()].game.votes, action.payload];
    }
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/addVoteAction',
      payload: STATE[getStateIndex()].game.votes,
    });
  }

  if (action.type === 'set_average_values') {
    const totalVotes = STATE[getStateIndex()].game.votes.length;
      const votesCounter: { [key: string]: number } = {};
      const votesValues: string[] = [];
      const result: { value: string, percents: number }[] = [];
      STATE[getStateIndex()].game.votes.forEach((vote) => {
        if (!votesValues.includes(vote.value)) {
          votesValues.push(vote.value);
          votesCounter[vote.value] = 1;
        } else {
          votesCounter[vote.value] += 1;
        }
      });
      Object.entries(votesCounter)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 10)
        .forEach(([voteValue, counter]) => {
          const percents = Math.round(counter / totalVotes * 10000) / 100; 
          result.push({ value: voteValue, percents })
        });
    STATE[getStateIndex()].game.averageValues = result;
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/setAverageValuesAction',
      payload: STATE[getStateIndex()].game.averageValues,
    });
  }

  if (action.type === 'add_round_in_statistics') {
    STATE[getStateIndex()].game.statistics = [
      ...STATE[getStateIndex()].game.statistics,
      { 
        issue: STATE[getStateIndex()].game.currentIssue,
        votes: STATE[getStateIndex()].game.votes,
        averageValues: STATE[getStateIndex()].game.averageValues
      },
    ];
    io.to(gameID).emit('UPDATE_CLIENT', {
      type: 'game/addRoundInStatisticsAction',
      payload: STATE[getStateIndex()].game.statistics,
    });
  }

  if (action.type === 'stop_game') {
    io.to(gameID).emit('GAME_STOPPED');
  }

  // ADD YOUR REDUCER:
}
