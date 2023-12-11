import { Comment, User } from "@/typescript/comment";
import random from "../helpers/getRamdom";

export const useCommentDetail = (newComment: string, user: User): Comment => {
  const commentDetail: Comment = {
    id: random.getRandomId(),
    content: newComment,
    createdAt: random.getRandomTime(),
    score: 0,
    user: {
      username: user.username,
      image: {
        png: user.image.png,
        webp: user.image.webp
      }
    },
  };

  return commentDetail;
};