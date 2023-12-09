import { useRouter } from "next/navigation";
import { useTextareaFocus } from "../hook/useTextareaFocus";
import { rq } from "../libs/axios";
import { Dispatch, SetStateAction } from "react";

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
  const { textValue, setTextValue, textareaRef } = useTextareaFocus({
    initialContent: `${replyingTo ? `@${replyingTo}, ` : ''}${content}`
  })
  const router = useRouter()

  const handleUpdate = () => {
    const usernamePattern = /@\w+,\s*/

    const sanitizeTextValue = textValue.replace(usernamePattern, '')
    rq.put('/api/comments', {
      commentId,
      content: sanitizeTextValue
    })
      .then(res => {
        setOnEdit(false)
        router.refresh()
      })
      .catch(err => console.log(err))
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
        ref={textareaRef}
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
        <button 
          type="button"
          className="
          bg-primary-moderate-blue
          text-neutral-white
            px-5
            py-[.66rem]
            rounded-md
            hover:bg-opacity-90
            transition
            duration-200
            border
            font-500
          "
          onClick={handleUpdate}
        >
          UPDATE
        </button>
      </div>
    </section>
  )
}
