import { NextResponse } from "next/server"
import { Comment } from "@/typescript/comment"
import { File } from "@/app/helpers/manageFile"
import { makeSlug } from "@/app/libs/usernameToSlug"

export async function PUT(
  req: Request,
  { params: {id: commentId} }: { params: {id: string} } 
  ) {
  try {
    if (req.method !== 'PUT') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }

    // Get Request Body
    const {score, userId} = await req.json() as { score: number, userId: string }

    if(typeof score !== 'number' || typeof userId !== 'string') {
      return new NextResponse('Invalid Request Body', { status: 400 })
    }

    // get hash table from plain text file
    const { user_commentIds } = await File.getScoresHash()
    const {currentUser, comments} = await File.getAllData()

    const userCommentKey = `${userId}_${commentId}`
    user_commentIds[userCommentKey] = user_commentIds[userCommentKey] || 0

    // find comment
    const comment = findComment(commentId, comments)

    if(!comment) {
      return new NextResponse('Comment Not Found', { status: 404 })
    }
    
    if(makeSlug(comment.user.username) === userId) {
      return new NextResponse('You cannot score your own comment', { status: 403 })
    }

    const canIncreaseScore = comment.score + 1 === score && user_commentIds[userCommentKey] === 0
    const canDecreaseScore = comment.score - 1 === score && user_commentIds[userCommentKey] === 1 

    if(!canIncreaseScore && !canDecreaseScore) {
      return new NextResponse('You cannot score twice', { status: 403 })
    }

    if(canIncreaseScore) {
      comment.score += 1
      user_commentIds[userCommentKey] = 1
    }
    
    if(canDecreaseScore) {
      comment.score -= 1
      user_commentIds[userCommentKey] = 0
    }

    // Update hash table in plain text file
    await File.addAllData({ comments, currentUser })
    await File.saveScoreHash(user_commentIds)

    return NextResponse.json({ message: 'success', status: 200 })
  } catch (error) {
    console.log('CANNOT SCORE A COMMENT', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

const findComment = (commentId: string, comments: Comment[]): Comment | undefined => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment
    }

    if (comment.replies) {
      const foundInReplies = findComment(commentId, comment.replies)
      if(foundInReplies) {
        return foundInReplies
      }
    }
  }
  return undefined
}