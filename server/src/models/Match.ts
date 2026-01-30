import mongoose, { Schema, Document } from 'mongoose';
import { Match as IMatch } from '../../../shared/types';

export interface MatchDocument extends Omit<IMatch, '_id'>, Document {}

const matchSchema = new Schema<MatchDocument>({
  user1Id: { type: String, required: true, ref: 'User' },
  user2Id: { type: String, required: true, ref: 'User' },
  conversationId: { type: String, required: true, ref: 'Conversation' },
}, {
  timestamps: true
});

export const Match = mongoose.model<MatchDocument>('Match', matchSchema);