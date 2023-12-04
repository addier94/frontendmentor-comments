'use client'

import { ImageProfile } from "@/components/image-profile";
import { User } from "@/typescript/comment";
import { useState } from "react";

interface CommentFormProps {
  user: User;
}
export const CommentForm = ({
  user
}: CommentFormProps) => {
  const [newComment, setNewComment] = useState('')

  return (
    <div className="flex flex-col gap-[.80rem] bg-neutral-white p-4 rounded-md">
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
      "
    />
    <div className="
      flex
      items-center
      justify-between
    ">
      <figure>
        <ImageProfile
          src={user.image.png} 
          alt="profile image"
          size={8}
        />
      </figure>
      <button
        className="
          bg-primary-moderate-blue
          text-neutral-white
          font-500
          px-7 
          py-[.66rem]
          rounded-md
          hover:bg-primary-cyan-dark
          transition-colors
          duration-200
          border
        "
      >
        SEND
      </button>
    </div>
  </div>
  )
}
