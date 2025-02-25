
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

export interface ServiceTime {
  type: string;
  day: string;
  time: string;
}

export interface Church {
  id: string;
  name: string;
  description: string;
  missionStatement: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  serviceTimes: ServiceTime[];
  adminUserId?: string;
  createdAt?: string;
  updatedAt?: string;
  bannerImage?: string;
  logoImage?: string;
  coordinates?: [number, number];
  address?: string;
  category?: string;
  phone?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventType: string;
  startTime: string;
  endTime?: string;
  location?: string;
  isOnline: boolean;
  onlineUrl?: string;
  churchId?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  isGroup: boolean;
  title?: string;
  createdAt: string;
  updatedAt: string;
  participants: User[];
  lastMessage?: Message;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: User;
  content: string;
  attachmentUrls: string[];
  createdAt: string;
  parentMessageId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  content?: string;
  referenceId?: string;
  referenceType?: string;
  isRead: boolean;
  createdAt: string;
}
