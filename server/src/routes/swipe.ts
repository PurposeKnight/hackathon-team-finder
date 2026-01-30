import express from 'express';
import { Like } from '../models/Like';
import { MatchService } from '../services/matchService';

const router = express.Router();

// Handle swipe action (like or pass)
router.post('/', async (req, res) => {
  try {
    const { fromUserId, toUserId, action } = req.body;

    if (action === 'like') {
      // Create like record
      const like = new Like({
        fromUserId,
        toUserId
      });

      await like.save();

      // Check for match
      const isMatch = await MatchService.checkForMatch(fromUserId, toUserId);

      res.json({
        success: true,
        isMatch,
        message: isMatch ? "It's a match! 🎉" : 'Like recorded'
      });
    } else {
      // For 'pass', we don't store anything (could add Pass model if needed)
      res.json({
        success: true,
        isMatch: false,
        message: 'Passed'
      });
    }
  } catch (error) {
    console.error('Swipe error:', error);
    res.status(500).json({ error: 'Failed to process swipe' });
  }
});

// Get user's matches
router.get('/matches/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const matches = await MatchService.getUserMatches(userId);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

export default router;