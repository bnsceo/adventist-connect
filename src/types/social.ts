
export interface User {
  id: string;
  name: string;
  role: string;
  church: string;
  avatar: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hasLiked: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}
