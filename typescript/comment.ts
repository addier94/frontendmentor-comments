export interface Data {
  currentUser: User;
  comments:    Comment[];
}

export interface Comment {
  id:          string;
  content:     string;
  createdAt:   number;
  score:       number;
  user:        User;
  replies?:    Comment[];
  replyingTo?: string;
}

export interface User {
  image:    Image;
  username: string;
}

export interface Image {
  png:  string;
  webp: string;
}