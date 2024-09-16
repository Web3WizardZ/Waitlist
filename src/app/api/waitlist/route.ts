import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

  const filePath = path.join(process.cwd(), 'data', 'waitlist.json')

  try {
    let waitlist = []
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      waitlist = JSON.parse(fileContents)
    }

    waitlist.push(data)

    fs.writeFileSync(filePath, JSON.stringify(waitlist, null, 2))

    return NextResponse.json({ message: 'Successfully added to waitlist' })
  } catch (error) {
    console.error('Error writing to waitlist:', error)
    return NextResponse.json({ error: 'Failed to add to waitlist' }, { status: 500 })
  }
}