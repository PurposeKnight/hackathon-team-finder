export interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  techStack: string[];
  profileImage?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: Date;
}

export interface Like {
  _id: string;
  fromUserId: string;
  toUserId: string;
  createdAt: Date;
}

export interface Match {
  _id: string;
  user1Id: string;
  user2Id: string;
  conversationId: string;
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  participants: string[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export interface SwipeAction {
  action: 'like' | 'pass';
  targetUserId: string;
}