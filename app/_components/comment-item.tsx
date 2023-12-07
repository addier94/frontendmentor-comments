import { Image as ImageType, User } from "@/typescript/comment";
import { Comment } from "@/typescript/comment";
import { ImageProfile } from "@/components/image-profile";
import Image from "next/image";


interface CommentItemProps {
  image: ImageType;
  userName: string;
  createdAt: string;
  content: string;
  score: number;
  replies?: Comment[];
  replyingTo?: string;
  user: User
}

export const CommentItem = ({
  image,
  userName,
  createdAt,
  content,
  score,
  replies,
  replyingTo,
  user
}: CommentItemProps) => {
  const isAuthUserComment = user.username === userName;
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
              src={image.png} 
              alt="profile image"
            />
          </figure>
          <div className="flex gap-2 items-center">
            <h2 className="font-rubik font-700 text-neutral-dark-blue">{userName}</h2>
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
          <span className="text-neutral-grayish-blue">{createdAt}</span>
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
          <p>
            {replyingTo && (
              <span className="text-primary-moderate-blue font-700 mr-1">
                @{replyingTo}
              </span>
            )}
            {content}
          </p>
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
          <Image src="/images/icon-plus.svg" alt="Plus Icon" width={12} height={12} />
          <p className="font-500">{score}</p>
          <Image src="/images/icon-minus.svg" alt="Minus Icon" width={12} height={12} />
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
            <button className="flex items-center gap-2">
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
              >
                <Image src="/images/icon-delete.svg" alt="Delete Icon" width={14} height={14} />
                <span>Delete</span>
              </button>
              <button className="flex items-center gap-[.40rem]">
                <Image src="/images/icon-edit.svg" alt="Edit Icon" width={14} height={14} />
                <span>Edit</span>
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
        {replies && replies.map((reply) => (
          <CommentItem 
            key={reply.id}
            image={reply.user.image}
            userName={reply.user.username}
            createdAt={reply.createdAt}
            content={reply.content}
            score={reply.score}
            replies={reply.replies}
            replyingTo={reply.replyingTo}
            user={user}
          />
        ))}
      </div>
    </>
  )
}