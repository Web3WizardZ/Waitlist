// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

const clientPromise: Promise<MongoClient> = global._mongoClientPromise || new MongoClient(process.env.MONGODB_URI as string).connect();

if (!global._mongoClientPromise) {
  global._mongoClientPromise = clientPromise;
}

// Named export
export { clientPromise };
