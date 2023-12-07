'use client'

import { ImageProfile } from "@/components/image-profile";
import { User } from "@/typescript/comment";
import { useState } from "react";
import { rq } from "../libs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Comment } from "@/typescript/comment";
import random from "../helpers/getRamdom";

interface CommentFormProps {
  user: User;
  onCommentAdded: () => void;
}
export const CommentForm = ({
  user,
  onCommentAdded
}: CommentFormProps) => {
  const [newComment, setNewComment] = useState('')
  const router = useRouter()

  const addComment = () => {
    if(!newComment.trim()){
      toast.error('Comment cannot be empty!')
      return
    }

    const commentDetail:Comment = {
      id: random.getRandomId(),
      content: newComment,
      createdAt: random.getRandomTime(),
      score: 0,
      user: {
        username: user.username,
        image: {
          png: user.image.png,
          webp: user.image.webp
        }
      },
      replies: []
    }
    rq.post('/api/comments', commentDetail)
    .then(res => {
      setNewComment('')
      router.refresh()
      onCommentAdded()
    })
      .catch(err => toast.error('Error adding comment!'))
  }

  return (
    <div className="
      grid
      grid-cols-2
      bg-neutral-white 
      p-4 
      rounded-md
      gap-4
      sm:grid-cols-12
      "
    >
    <textarea 
      placeholder="Add a comment..."
      className="
        w-full
        py-2
        px-4
        border
        rounded-md
        focus:outline-none
        focus:ring-2
        focus:ring-neutral-grayish-blue
        resize-none
        h-[5rem]
        col-span-2
        sm:row-start-1
        sm:row-end-3
        sm:col-start-2
        sm:col-end-11
      "
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <figure className="
      self-center
      col-span-1 
      sm:self-start
      sm:row-start-1
      sm:row-end-2
      sm:col-start-1
      sm:col-end-2
    ">
      <ImageProfile
        src={user.image.png} 
        alt="profile image"
      />
    </figure>
    
    <div className="
      col-start-2
      col-span-1
      flex 
      justify-end
      self-start
      sm:row-start-1
      sm:row-end-2
      sm:col-start-11
      sm:col-end-13
    ">
      <button
        className="
          bg-primary-moderate-blue
          text-neutral-white
          font-500
          px-8 
          py-[.66rem]
          rounded-md
          hover:bg-primary-cyan-dark
          transition-colors
          duration-200
          border
          sm:px-6
        "
        onClick={addComment}
      >
        SEND
      </button>
    </div>
  </div>
  )
}
