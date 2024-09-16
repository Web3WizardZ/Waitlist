import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('waitlist');
    
    const { name, email, message } = await request.json();

    // Simple validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const data = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    await collection.insertOne(data);

    return NextResponse.json({ message: 'Successfully added to waitlist' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
  } finally {
    await client.close(); // Ensure the client is closed
  }
}
