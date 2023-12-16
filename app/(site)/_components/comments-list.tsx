'use client'

import { useRef } from "react";

import { User, Comment } from "@/typescript/comment";
import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";

interface CommentListProps {
  comments: Comment[]; 
  user: User;
}
export const CommentsList = ({
  comments,
  user
}: CommentListProps ) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  return (
    <div className="
      px-4 py-6
      sm:max-w-[50rem]
      sm:mx-auto
    ">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id}
          comment={comment}
          user={user} 
        />
      ))}

      <CommentForm 
        user={user}
      />
    </div>
  )
}