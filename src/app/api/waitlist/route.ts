// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    // Get the form data
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Use the persistent MongoDB connection
    const client = await clientPromise;
    const db = client.db('Cluster0');
    const collection = db.collection('waitlist');

    const data = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    await collection.insertOne(data);

    return NextResponse.json({ message: 'Successfully added to waitlist' });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ error: 'Failed to add to waitlist' }, { status: 500 });
  }
}
