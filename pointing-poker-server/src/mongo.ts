import {
  DeleteResult,
  FindOptions,
  InsertOneResult,
  MongoClient,
} from 'mongodb';

const url =
  'mongodb+srv://admin:admin@cluster0.vosdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'efk';
const collectionName = 'messages';

export const createMessage = async (
  message: string
): Promise<InsertOneResult<Document>> => {
  const client = await MongoClient.connect(url);
  const result = await client
    .db(dbName)
    .collection(collectionName)
    .insertOne({ message });
  client.close();
  return result;
};

export const getMessage = async (message: string): Promise<any> => {
  const client = await MongoClient.connect(url);
  const result = await client
    .db(dbName)
    .collection(collectionName)
    .findOne({ message });
  client.close();
  return result;
};

export const removeMessage = async (message: string): Promise<DeleteResult> => {
  const client = await MongoClient.connect(url);
  const collection = await client.db(dbName).collection(collectionName);
  const result = await collection.deleteOne({ message });
  client.close();
  return result;
};
