import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment';
let trelloDBInstance = null;
const clientInstance = new MongoClient(env.mongodb_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const connectToMongoDB = async () => {
  await clientInstance.connect();

  trelloDBInstance = clientInstance.db(env.database_name);
};

export const getDatabase = () => {
  if (!trelloDBInstance) {
    throw new Error('Must connect to MongoDB first!');
  }
  return trelloDBInstance;
};

export const closeMongoDBConnection = async () => {
  await clientInstance.close();
};
