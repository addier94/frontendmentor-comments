import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    if (req.method !== 'GET') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }
    const jsonDirectory = path.join(process.cwd(), 'public', 'data.json')
    const readComments = await fs.readFile(jsonDirectory, 'utf-8')
    const jsonData = JSON.parse(readComments)

    return NextResponse.json(jsonData)
  } catch (error) {
    console.log('CANNOT_GET_COMMENTS', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(
  req: Request,
  ) {
  try {
    if (req.method !== 'POST') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }
    // Parse the incoming request to get the data to be added
    const body = await req.json()

    const jsonDirectory = path.join(process.cwd(), 'public', 'data.json')

    // Read the existing data from the data.json file
    const readComments = await fs.readFile(jsonDirectory, 'utf-8') 
    const jsonData = JSON.parse(readComments)

    // Add the new data to the existing data 
    // jsonData.push(body)
    jsonData.comments.push(body)

    // Write the updated data to the data.json file
    await fs.writeFile(jsonDirectory, JSON.stringify(jsonData, null, 2))

    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.log('CANNOT POST COMMENT', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}