import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

import { Comment, User } from '@/typescript/comment'
import { File } from '@/app/helpers/manageFile'

// Get all comments
export async function GET(req: Request) {
  try {
    
    if (req.method !== 'GET') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }

    // Define the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'public', 'users.json')
  
    // Read the existing data from the data.json file
    const readData = await fs.readFile(jsonDirectory, 'utf-8')
    const data:User[] = JSON.parse(readData) 

    return NextResponse.json({users:data, status: 200})
  } catch (error) {
    console.log('CANNOT_GET_COMMENTS', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// set new user as default
export async function PUT(req: Request) {
  try {
    
    if (req.method !== 'PUT') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }

    const body = await req.json()
    const { user } = body as { user: User }

    const comments:Comment[] = await File.getAllComments()

    const merge = { currentUser: user, comments }

    // Write the updated data to the data.json file
    await File.addAllData(merge)

    return NextResponse.json({ message: 'success', status: 200})
  } catch (error) {
    console.log('CANNOT_POST_USER', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// singOut user 
export async function DELETE(req: Request) {
  try {
    
    if (req.method !== 'DELETE') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }

    const comments:Comment[] = await File.getAllComments()

    // Define the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'public', 'data.json')
  
    // Write the updated data to the data.json file
    await fs.writeFile(jsonDirectory, JSON.stringify({comments}, null, 2))

    return NextResponse.json({ message: 'success', status: 200})
  } catch (error) {
    console.log('CANNOT_POST_USER', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}