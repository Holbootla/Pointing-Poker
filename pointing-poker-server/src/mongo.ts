import { DeleteResult, MongoClient } from 'mongodb';
import {
  IUser,
  IServerState,
  IIssue,
  IChatMessage,
  IGameState,
  IGameSettings,
  IVote,
  IAverageValue
} from './state';
import fs from 'fs';
import path from 'path';

type StateDocument = IServerState & Document;

const url =
  'mongodb+srv://admin:admin@cluster0.vosdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'efk';
const collectionName = 'states';

export const updateState = async (
  method,
  gameID: string,
  methodArgs: unknown[],
): Promise<unknown> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await method.aply(collection, [...methodArgs]);
  const result = await collection.findOne({ gameID });
  client.close();
  return result
};

export const createState = async (
  gameID: string,
  users: IUser[],
  issues: IIssue[] = [],
  chatHistory: IChatMessage[] = [],
  game: IGameState = {
    votes: [],
    averageValues: [],
    statistics: [],
    currentTimer: { minutes: 0, seconds: 0 }
  },
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.insertOne({ gameID, users, issues, chatHistory, game });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const getState = async (gameID: string): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const result = await client
    .db(dbName)
    .collection(collectionName)
    .findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const removeSTate = async (gameID: string): Promise<DeleteResult> => {
  const client = await MongoClient.connect(url);
  const result = await client
    .db(dbName)
    .collection(collectionName)
    .deleteOne({ gameID });
  client.close();
  return result;
};

export const addUser = async (
  gameID: string,
  user: IUser,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.updateOne({ gameID }, { $push: { users: user } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const kickUser = async (
  gameID: string,
  userID: string,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.updateOne({ gameID }, { $pull: { users: { id: userID } } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const avatarUpload = async (
  gameID: string,
  userID: string,
  avatarName: string,
  avatarData: string | ArrayBuffer | null,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const photoDir = path.resolve(__dirname, './temp/')
  if (!fs.existsSync(photoDir)) {
    fs.mkdirSync(photoDir)
  }
  const fileName = `${Date.now()}${avatarName}`
  const writer = fs.createWriteStream(path.resolve(photoDir, fileName), {
    encoding: 'base64'
  });
  writer.write(avatarData);
  writer.end();
  const avatar = `http://localhost:3001/temp/${fileName}`;
  const newUsers = state.users.map((user) => (user.id === userID) ? { ...user, avatar } : user);
  await collection.updateOne({ gameID }, { $set: { users: newUsers } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument
};

export const changeGameName = async (
  gameID: string,
  gameName: string,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.updateOne({ gameID }, { $set: { gameName } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const addIssue = async (
  gameID: string,
  issue: IIssue,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.updateOne({ gameID }, { $push: { issues: issue } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const deleteIssue = async (
  gameID: string,
  issueID: number | string,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.updateOne({ gameID }, { $pull: { issues: { id: issueID } } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const editIssue = async (
  gameID: string,
  newIssue: IIssue,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const newIssues = state.issues.map((issue) => (issue.id === newIssue.id) ? newIssue : issue);
  await collection.updateOne({ gameID }, { $set: { issues: newIssues } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const updateIssues = async (
  gameID: string,
  issues: IIssue[],
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  await collection.updateOne({ gameID }, { $set: { issues } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const changeSettings = async (
  gameID: string,
  gameSettings: IGameSettings,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const minutes = Number(gameSettings.timerMinutes);
  const seconds = Number(gameSettings.timerSeconds);
  const currentTimer = { minutes, seconds };
  const newGame = { ...state.game, currentTimer };
  await collection.updateOne({ gameID }, { $set: { gameSettings, game: newGame } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const setCurrentTimer = async (
  gameID: string,
  currentTimer: { minutes: number; seconds: number },
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const newGame = { ...state.game, currentTimer };
  await collection.updateOne({ gameID }, { $set: { game: newGame } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const startRound = async (
  gameID: string,
  voteResult: string,
  roundStatus: 'in progress' | 'awaiting' = 'in progress',
  votes: IVote[] = [],
  averageValues: IAverageValue[] = [],
  showRestartControls: boolean = false,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const newUsers = state.users.map((user) => ({ ...user, voteResult }));
  const newGame = { ...state.game, roundStatus, votes, averageValues, showRestartControls };
  await collection.updateOne({ gameID }, { $set: { game: newGame, users: newUsers } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const finishRound = async (
  gameID: string,
  currentIssue: IIssue,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });

  const newIssues = state.issues.map((issue) => (issue.id === currentIssue.id)
    ? { ...issue, status: currentIssue.status }
    : issue);

  const totalVotes = state.game.votes.length;
  const votesCounter: { [key: string]: number } = {};
  const votesValues: string[] = [];
  const averageValues: { value: string; percents: number }[] = [];
  state.game.votes.forEach((vote) => {
    if (!votesValues.includes(vote.value)) {
      votesValues.push(vote.value);
      votesCounter[vote.value] = 1;
    } else {
      votesCounter[vote.value] += 1;
    }
  });
  Object.entries(votesCounter)
    .sort((a, b) => a[1] - b[1])
    .forEach(([voteValue, counter]) => {
      const percents = Math.round((counter / totalVotes) * 10000) / 100;
      averageValues.push({ value: voteValue, percents });
    });

  const statistics = [
    ...state.game.statistics,
    {
      issue: currentIssue,
      votes: state.game.votes,
      averageValues: averageValues,
    },
  ];

  const newGame = { ...state.game, currentIssue, averageValues, statistics, showRestartControls: false };
  await collection.updateOne({ gameID }, { $set: { issues: newIssues, game: newGame } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const resetGame = async (
  gameID: string,
  emptyIssue: IIssue = { id: '', title: '', link: '', priority: 'low', status: 'awaiting' },
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const minutes = Number(state.gameSettings.timerMinutes);
  const seconds = Number(state.gameSettings.timerSeconds);
  const currentTimer = { minutes, seconds };
  const newGame = { ...state.game, currentTimer, currentIssue: emptyIssue, nextIssue: emptyIssue };
  await collection.updateOne({ gameID }, { $set: { game: newGame } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const setCurrentIssue = async (
  gameID: string,
  currentIssue: IIssue,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const newIssues = state.issues.map((issue) => {
    if (issue.id === currentIssue.id) {
      return { ...issue, status: currentIssue.status };
    }
    if (issue.status === 'current') {
      return { ...issue, status: 'awaiting' };
    }
    return issue;
  });
  const newGame = { ...state.game, currentIssue };
  await collection.updateOne({ gameID }, { $set: { game: newGame, issues: newIssues } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const stopRound = async (
  gameID: string,
  roundStatus: 'in progress' | 'awaiting' = 'awaiting',
  showRestartControls: boolean = true,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const minutes = Number(state.gameSettings.timerMinutes);
  const seconds = Number(state.gameSettings.timerSeconds);
  const currentTimer = { minutes, seconds };
  const newGame = { ...state.game, roundStatus, currentTimer, showRestartControls };
  await collection.updateOne({ gameID }, { $set: { game: newGame } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const setVote = async (
  gameID: string,
  userID: string,
  value: string,
  voteResult: string,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const votes = state.game.votes;
  const newVotes = (votes.find((vote) => vote.userID === userID))
    ? votes.map((vote) => (vote.memberId === userID) ? { userID, value } : vote)
    : [...votes, { userID, value }];
  const newGame = { ...state.game, votes: newVotes };
  const newUsers = state.users.map((user) => (user.id === userID) ? { ...user, voteResult } : user);
  await collection.updateOne({ gameID }, { $set: { game: newGame, users: newUsers } });
  const result = await collection.findOne({ gameID });
  console.log(result);
  client.close();
  return result as StateDocument;
};


export const incrementKickCounter = async (
  gameID: string,
  userID: string,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const state = await collection.findOne({ gameID });
  const user = state.users.find((item) => item.id === userID);
  if (user)
    if (user.kickCounter >= 2) {
      await collection.updateOne({ gameID }, { $pull: { users: { id: userID } } });
    } else if (user.kickCounter <= 1) {
      const newValue = user.kickCounter + 1;
      const newUsers = state.users.map((user) => (user.id === userID) ? { ...user, kickCounter: newValue } : user);
      await collection.updateOne({ gameID }, { $set: { game: gameID, users: newUsers } });
    }
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};

export const setMessages = async (
  gameID: string,
  clientMessage: IChatMessage,
): Promise<StateDocument> => {
  const client = await MongoClient.connect(url);
  const collection = client.db(dbName).collection(collectionName);
  const { userId, message, time } = clientMessage;
  const messageTime = new Date(time);
  const messageToHistory = {
    userId: userId,
    message: message,
    time: `${messageTime.getHours()}:${messageTime.getMinutes()} `,
    messageId: time,
  };
  await collection.updateOne({ gameID }, { $push: { chatHistory: messageToHistory } });
  const result = await collection.findOne({ gameID });
  client.close();
  return result as StateDocument;
};
