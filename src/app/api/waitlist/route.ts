import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI as string)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  // Simple validation
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const data = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  }

  try {
    await client.connect()
    const db = client.db('your-database-name')
    const collection = db.collection('waitlist')

    await collection.insertOne(data)

    return NextResponse.json({ message: 'Successfully added to waitlist' })
  } catch (error) {
    console.error('Error writing to waitlist:', error)
    return NextResponse.json({ error: 'Failed to add to waitlist' }, { status: 500 })
  }
}
