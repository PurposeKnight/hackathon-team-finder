import mongoose, { Schema, Document } from 'mongoose';
import { Conversation as IConversation, Message } from '../../../shared/types';

export interface ConversationDocument extends Omit<IConversation, '_id'>, Document {}

const messageSchema = new Schema<Message>({
  senderId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new Schema<ConversationDocument>({
  participants: [{ type: String, required: true, ref: 'User' }],
  messages: [messageSchema],
}, {
  timestamps: true
});

export const Conversation = mongoose.model<ConversationDocument>('Conversation', conversationSchema);