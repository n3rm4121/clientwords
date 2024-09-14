import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.DB_NAME) {
  throw new Error('Please define the DB_NAME environment variable inside .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

let cachedConnection: MongoConnection | null = null;

export default async function dbConnect(): Promise<Db> {
  if (cachedConnection) {
    return cachedConnection.db;
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedConnection = { client, db };

  client.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    cachedConnection = null;
  });

  client.on('close', () => {
    console.log('MongoDB connection closed');
    cachedConnection = null;
  });

  return db;
}

// Optional: Add a function to explicitly close the connection if needed
export async function closeDbConnection() {
  if (cachedConnection) {
    await cachedConnection.client.close();
    cachedConnection = null;
  }
}
