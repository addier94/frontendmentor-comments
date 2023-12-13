import { Comment, User } from "@/typescript/comment";
import { ImageProfile } from "@/components/image-profile";
import Image from "next/image";
import { rq } from "../libs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CommentEditForm } from "./comment-edit-form";
import { CommentReplyForm } from "./comment-reply-form";
import { Score } from "./score";
import getTimeAgo from "../helpers/customTime";


interface CommentItemProps {
  comment: Comment;
  user: User
}

export const CommentItem = ({
  comment,
  user
}: CommentItemProps) => {
  const [onEdit, setOnEdit] = useState<boolean>(false)
  const [onReply, setOnReply] = useState<boolean>(false)
  const isAuthUserComment = user.username === comment.user.username;
  const router = useRouter()

  const deleteComment = (id: string) => {
    rq.delete(`api/comments/${id}`)
      .then(res => {
        router.refresh()        
      })
      .catch(err => toast.error('Something went wrong'))
  }
  return (
    <>
      <article
        className="
          bg-neutral-white
          px-5 
          py-3
          rounded-md
          mb-4
          grid
          grid-cols-2
          gap-4
          sm:px-6
          sm:py-4
          sm:grid-cols-12
        "
      >
        <header
          className="
            flex
            items-center
            gap-3
            col-span-2
            sm:col-start-2
            sm:col-end-9
            sm:ml-1
          "
        >
          <figure className="flex items-center">
            <ImageProfile 
              src={comment.user.image.png} 
              alt="profile image"
            />
          </figure>
          <div className="flex gap-2 items-center">
            <h2 className="font-rubik font-700 text-neutral-dark-blue">{comment.user.username}</h2>
            {isAuthUserComment && (
              <span className="
              bg-primary-moderate-blue
                text-neutral-white
                rounded-sm
                px-2
                text-xs
                font-700
                h-5
                leading-[1.15rem]
              ">you</span>
            )}
          </div>
          <span className="text-neutral-grayish-blue">{getTimeAgo(comment.createdAt)}</span>
        </header>
        <section className="
        text-neutral-grayish-blue
          col-span-2
          sm:row-start-2
          sm:row-end-3
          sm:col-start-2
          sm:col-end-13
          sm:ml-1
        ">
          <div>
            {(comment.replyingTo && !onEdit) && (
              <span className="text-primary-moderate-blue font-700 mr-1">
                @{comment.replyingTo}
              </span>
            )}

            {onEdit ? (
              <CommentEditForm 
                setOnEdit={setOnEdit}
                commentId={comment.id}
                content={comment.content}
                replyingTo={comment.replyingTo}
              />
            ) : (
              <p>
                {comment.content}
              </p>
            )}
          </div>
        </section>
        <section className="
          flex 
          bg-neutral-light-gray
          text-primary-moderate-blue
          rounded-md
          w-20 
          h-8
          items-center
          justify-between
          gap-2
          px-2
          col-span-1
          sm:flex-col
          sm:w-8
          sm:h-20
          sm:py-2
          sm:col-start-1
          sm:col-end-2
          sm:row-start-1
          sm:row-end-3
        ">
          <Score score={comment.score} commentId={comment.id} userId={user.username} />
        </section>
        <section className="
          text-primary-moderate-blue
          col-span-1
          justify-self-end
          font-700
          text-sm
          flex
          sm:row-start-1
          sm:row-end-2
          sm:col-start-9
          sm:col-end-13
        ">
          {!isAuthUserComment ? (
            <button 
              className="flex items-center gap-2"
              onClick={() => setOnReply(!onReply)}
            >
              <Image src="/images/icon-reply.svg" alt="Reply Icon" width={14} height={14} />
              <span>Reply</span>
            </button>
          ):(
            <div className="flex items-center gap-4 font-500">
              <button
                className="
                  flex 
                  gap-[.40rem] 
                  items-center
                  text-primary-soft-red"
                  onClick={() => deleteComment(comment.id)}
              >
                <Image src="/images/icon-delete.svg" alt="Delete Icon" width={14} height={14} />
                <span>Delete</span>
              </button>
              <button 
                className="flex items-center gap-[.40rem]"
                onClick={() => setOnEdit(!onEdit)}
              >
                <Image src="/images/icon-edit.svg" alt="Edit Icon" width={14} height={14} />
                <span>{!onEdit ? 'Edit' : 'Close'}</span>
              </button>
            </div>
          )}
        </section>
      </article>

      <div className="
        pl-4
        border-l-[3px]
        border-neutral-light-gray
        sm:pl-6
        sm:ml-8
      ">
        {comment.replies && comment.replies.map((reply, index) => (
          <CommentItem 
            key={reply.id}
            comment={reply}
            user={user}
          />
        ))}
      </div>

      { onReply && (
        <div className="mb-4">
          <CommentReplyForm 
            user={user}
            commentId={comment.id}
            replyingTo={comment.user.username}
            onCommentAdded={() => setOnReply(false)}
          />
        </div>
      )}
    </>
  )
}