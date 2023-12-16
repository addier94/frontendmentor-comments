'use client'

import { useEffect, useState } from "react";

import { User, Comment } from "@/typescript/comment";
import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";
import { UsersModal } from "./users-modal";
import { rq } from "@/app/libs/axios";
import ErrorComponent from "@/app/components/error-component";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CommentListProps {
  comments: Comment[]; 
  user: User;
}
export const CommentsList = ({
  comments,
  user
}: CommentListProps ) => {
  const [users, setUsers] = useState<User[] | null>(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if(!user) {
      rq.get('api/users')
        .then(res => setUsers(res.data.users))
        .catch(err => setError(err?.message || 'Something went wrong'))
    }
  }, [user])

  if(error) {
    return <ErrorComponent message={error} />
  }

  if(!user) {
    return (
      <UsersModal
        isOpen={true}
        users={users || []}
        onClose={() => {}}
      />
    )
  }

  const singOut = async () => {
    try {
      await rq.delete('api/users')
      router.refresh()
    } catch (err:any) {
      toast.error(err?.message || 'Something went wrong!')
    }
  }
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
      <div className="mt-5" />
      <Button 
        fullWidth
        onClick={singOut}
      >
        SingOut
      </Button>
    </div>
  )
}