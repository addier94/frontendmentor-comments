import { User, Comment } from "@/typescript/comment";
import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";

interface ListCommentsProps {
  comments: Comment[]; 
  user: User;
}
export const ListComments = ({
  comments,
  user
}: ListCommentsProps ) => {
  return (
    <div className="
      px-4 py-6
      sm:max-w-[50rem]
      sm:mx-auto
    ">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id}
          image={comment.user.image}
          userName={comment.user.username}
          createdAt={comment.createdAt}
          content={comment.content}
          score={comment.score}
          replies={comment.replies}
          user={user}
        />
      ))}
      <CommentForm 
        user={user}
      />
    </div>
  )
}
