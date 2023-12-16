import { useRouter } from "next/navigation";

import { rq } from "@/app/libs/axios";
import toast from "react-hot-toast";

import { ImageProfile } from "@/app/components/image-profile";
import { User } from "@/typescript/comment";
import { useCommentDetail } from "@/app/hook/useCommentDetail";
import { useTextareaFocus } from "@/app/hook/useTextareaFocus";
import Button from "@/app/components/button";
import { useState } from "react";

interface CommentReplyFormProps {
  user: User;
  onCommentAdded: () => void;
  replyingTo: string;
  commentId: string;
}
export const CommentReplyForm = ({
  user,
  onCommentAdded,
  replyingTo,
  commentId
}: CommentReplyFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { textValue, setTextValue, textareaRef } = useTextareaFocus({
    initialContent: `@${replyingTo}, `
  })
  const commentDetail = useCommentDetail(textValue, user);

  const router = useRouter()

  const replyComment = () => {
    const withVariation = {...commentDetail, replyingTo, commentId}
    withVariation.content = withVariation.content.replace(/@\w+,\s*/, '')

    if(withVariation.content.length === 0) return toast.error('Comment cannot be empty!')

    rq.post('/api/comments/replies', withVariation)
      .then(res => {
        setTextValue('')
        router.refresh()
        onCommentAdded()
      })
      .catch(err => toast.error('Error replying comment!'))
  }

  const handleeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is Enter
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      replyComment()
    }
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
      value={textValue}
      onChange={(e) => setTextValue(e.target.value)}
      onKeyDown={handleeyPress}
      ref={textareaRef}
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
      <Button
        onClick={replyComment}
        disabled={isLoading}
      >
        REPLY
      </Button>
    </div>
  </div>
  )
}
