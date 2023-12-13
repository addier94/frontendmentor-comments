import Image from "next/image"
import { rq } from "../libs/axios"
import toast from "react-hot-toast"
import { makeSlug } from "../libs/usernameToSlug"
import { useRouter } from "next/navigation"

interface ScoreProps {
  score: number
  commentId: string
  userId: string
}

export const Score = ({
  score,
  commentId,
  userId
}: ScoreProps) => {
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
