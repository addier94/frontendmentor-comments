import { NextResponse } from "next/server"
import { Comment } from "@/typescript/comment"
import { File } from "@/app/helpers/manageFile"

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

    const {comments, currentUser} = await File.getAllData()

    const updatedComments: Comment[] = comments.filter(comment => {
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
    const updatedData = {currentUser, comments: updatedComments}

    // Write the updated data to the data.json file
    await File.addAllData(updatedData)

    return NextResponse.json({ message: 'success', status: 200 })
  } catch (error) {
    console.log('CANNOT DELETE COMMENT', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}