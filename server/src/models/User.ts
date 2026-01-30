import mongoose, { Schema, Document } from 'mongoose';
import { User as IUser } from '../../../shared/types';

export interface UserDocument extends Omit<IUser, '_id'>, Document {}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  techStack: [{ type: String, required: true }],
  profileImage: { type: String },
  location: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
}, {
  timestamps: true
});

export const User = mongoose.model<UserDocument>('User', userSchema);