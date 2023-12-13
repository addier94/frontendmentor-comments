import { ImageProfile } from "@/components/image-profile";
import { User } from "@/typescript/comment";
import { rq } from "../libs/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCommentDetail } from "../hook/useCommentDetail";
import { useTextareaFocus } from '../hook/useTextareaFocus';

interface CommentFormProps {
  user: User;
  // onCommentAdded: () => void;
}
export const CommentForm = ({
  user,
  // onCommentAdded
}: CommentFormProps) => {
  const {textValue, setTextValue, textareaRef} = useTextareaFocus({initialContent: ''})
  const commentDetail = useCommentDetail(textValue, user);

  const router = useRouter()

  const addComment = () => {
    if(!textValue.trim()){
      toast.error('Comment cannot be empty!')
      return
    }

    rq.post('/api/comments', {...commentDetail, replies: []})
    .then(res => {
      setTextValue('')
      router.refresh()
      delay()
    })
      .catch(err => {
        toast.error(err?.response?.data || 'Something went wrong')
      })
  }
  
  const handleeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is Enter
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      addComment()
    }
  }

  const delay = (ms: number = 300) => {
    const timerId = setTimeout(() => {
      scrollBottomHandler()
    }, ms)
    return () => clearTimeout(timerId)
  }

  const scrollBottomHandler = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' 
    });
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
          hover:opacity-90
          hover:bg-primary-cyan-dark
          transition
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
