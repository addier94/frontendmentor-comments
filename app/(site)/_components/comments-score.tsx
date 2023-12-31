import Image from "next/image"
import { useRouter } from "next/navigation"

import { rq } from "@/app/libs/axios"
import toast from "react-hot-toast"

import { makeSlug } from "@/app/libs/usernameToSlug"

interface CommentsScoreProps {
  score: number
  commentId: string
  userId: string
}

export const CommentsScore = ({
  score,
  commentId,
  userId
}: CommentsScoreProps) => {
  const router = useRouter()

  const updateScore = (score: number) => {
    rq.put(`/api/comments/${commentId}/score`, {score, userId: makeSlug(userId)})
      .then(res => {
        router.refresh()
      })
      .catch(err => {
        console.log(err)
        toast.error(err?.response?.data || 'Something went wrong')
      })
  }

  const increaseScore = () => {
    if (score < 0) return 
    updateScore(score + 1)
  }

  const decreaseScore = () => {
    if (score <= 0) return 
    updateScore(score - 1)
  }

  return (
    <>
      <Image 
        onClick={increaseScore} 
        className="cursor-pointer"
        src="/images/icon-plus.svg" 
        alt="Plus Icon" 
        width={12} 
        height={12} />

        <p className="font-500">{score}</p>

      <Image 
        onClick={decreaseScore} 
        className="cursor-pointer"
        src="/images/icon-minus.svg" 
        alt="Minus Icon" width={12} height={12} />
    </>
  )
}
