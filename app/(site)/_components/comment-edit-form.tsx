import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { rq } from "@/app/libs/axios";

import { useTextareaFocus } from "@/app/hook/useTextareaFocus";
import Button from "@/app/components/button";

interface CommentEditFormProps {
  setOnEdit: Dispatch<SetStateAction<boolean>>;
  commentId: string;
  content: string;
  replyingTo?: string
}
export const CommentEditForm = ({
  setOnEdit,
  commentId,
  content,
  replyingTo
}: CommentEditFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { textValue, setTextValue, textareaRef } = useTextareaFocus({
    initialContent: `${replyingTo ? `@${replyingTo}, ` : ''}${content}`
  })
  const router = useRouter()

  const handleUpdate = () => {
    const outOfUsername = textValue.replace(/@\w+,\s*/, '')
    setIsLoading(true)
    rq.put('/api/comments', {
      commentId,
      content: outOfUsername
    })
      .then(() => {
        setOnEdit(false)
        router.refresh()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  const handleeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is Enter
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      handleUpdate()
    }
  }
  
  return (
    <section>
      <textarea 
        placeholder="Add a comment..."
        className="
        w-full
        py-2
        px-4
        border
        rounded-md
        resize-none
        focus:outline-none
        focus:ring-2
        focus:ring-neutral-500
        focus:border-transparent
        min-h-[6rem]
        "
        ref={textareaRef}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={handleeyPress}
      ></textarea>
      <div className="
        flex
        justify-end
        gap-2
        mt-2
      ">
        <Button
          onClick={handleUpdate}
          disabled={isLoading}
        >
          UPDATE
        </Button>
      </div>
    </section>
  )
}
