
export interface User {
  id: string;
  name: string;
  role: string;
  church: string;
  avatar: string;
  followers: number;
  following: number;
  bio?: string;
  location?: string;
  ministries?: string[];
  prayerRequests?: PrayerRequest[];
  testimonials?: Testimonial[];
  coverImage?: string;
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

export interface PrayerRequest {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  prayerCount: number;
  isPrivate: boolean;
}

export interface Testimonial {
  id: string;
  content: string;
  timestamp: string;
  category: string;
}
