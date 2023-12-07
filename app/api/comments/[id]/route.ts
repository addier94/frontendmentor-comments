import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from 'fs'
import { Comment, Data } from "@/typescript/comment"

interface DeleteParams {
  id: string
}
export async function DELETE(
  req: Request,
  { params }: { params: DeleteParams },
  ): Promise<NextResponse> {
  try {
    if (req.method !== 'DELETE') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }
    const { id } = params

    // Define the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'public', 'data.json')

    // Read the existing data from the data.json file
    const readComments = await fs.readFile(jsonDirectory, 'utf-8') 
    const jsonData:Data = JSON.parse(readComments)

    const updatedComments: Comment[] = jsonData.comments.filter(comment => {
      // Exclude the comment if it matches the specified id
      if (comment.id === id) {
        return false;
      }

      // If the comment has replies, filter out replies with the specified id
      if (comment.replies) {
        comment.replies = comment.replies.filter(reply => reply.id !== id)
      }

      // Include the comment in the updatedComments array
      return true;
    })

    // Create a new object with the ramining data
    const updatedData = {...jsonData, comments: updatedComments}

    // Write the updated data to the data.json file
    await fs.writeFile(jsonDirectory, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.log('CANNOT DELETE COMMENT', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}