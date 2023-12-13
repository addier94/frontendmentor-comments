import { NextResponse } from 'next/server'
import { Comment } from '@/typescript/comment'
import { File } from '@/app/helpers/manageFile'

type ExtendedComment = Comment & { commentId: string }

export async function POST(
  req: Request,
  ) {
  try {
    if (req.method !== 'POST') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }
    // Parse the incoming request to get the data to be added
    const body = await req.json() as ExtendedComment  

    // get data from data.json
    const {comments, currentUser} = await File.getAllData()

    // Add the new comment to the existing data 
    const { commentId, ...newComment } = body
    for(const comment of comments) {
      if(comment.id === commentId && comment.replies) {
        comment.replies.push(newComment)
        break 
      }

      if (comment.replies) {
        for(const reply of comment.replies) {
          if(reply.id === commentId && !reply.replies) {
            comment.replies.push(newComment)
            break 
          }
        }
      }
    }

    // Write the updated data to the data.json file
    await File.addAllData({currentUser, comments})

    return NextResponse.json({ message: 'success', status: 200 })
  } catch (error) {
    console.log('CANNOT POST COMMENT', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
