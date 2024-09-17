// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';  // Named import

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('your-database-name');
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
    console.error('Error writing to waitlist:', error);
    return NextResponse.json({ error: 'Failed to add to waitlist' }, { status: 500 });
  }
}
