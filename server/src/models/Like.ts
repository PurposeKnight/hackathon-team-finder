import mongoose, { Schema, Document } from 'mongoose';
import { Like as ILike } from '../../../shared/types';

export interface LikeDocument extends Omit<ILike, '_id'>, Document {}

const likeSchema = new Schema<LikeDocument>({
  fromUserId: { type: String, required: true, ref: 'User' },
  toUserId: { type: String, required: true, ref: 'User' },
}, {
  timestamps: true
});

// Ensure a user can only like another user once
likeSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export const Like = mongoose.model<LikeDocument>('Like', likeSchema);