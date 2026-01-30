import { Like } from '../models/Like';
import { Match } from '../models/Match';
import { Conversation } from '../models/Conversation';

export class MatchService {
  /**
   * Core matching logic: Check if two users have liked each other
   * If yes, create a match and conversation
   */
  static async checkForMatch(fromUserId: string, toUserId: string): Promise<boolean> {
    try {
      // Check if the target user has already liked the current user
      const reciprocalLike = await Like.findOne({
        fromUserId: toUserId,
        toUserId: fromUserId
      });

      if (reciprocalLike) {
        // It's a match! Create conversation and match record
        const conversation = new Conversation({
          participants: [fromUserId, toUserId],
          messages: []
        });
        
        const savedConversation = await conversation.save();

        // Create match record
        const match = new Match({
          user1Id: fromUserId,
          user2Id: toUserId,
          conversationId: savedConversation._id.toString()
        });

        await match.save();
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking for match:', error);
      throw error;
    }
  }

  /**
   * Get all matches for a user
   */
  static async getUserMatches(userId: string) {
    return await Match.find({
      $or: [
        { user1Id: userId },
        { user2Id: userId }
      ]
    }).populate('conversationId');
  }
}