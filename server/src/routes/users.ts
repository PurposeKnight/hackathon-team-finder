import express from 'express';
import { User } from '../models/User';
import { Like } from '../models/Like';

const router = express.Router();

// Get potential matches (users not yet liked/passed)
router.get('/discover/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { techStack } = req.query;

    // Get users already liked/passed by current user
    const likedUsers = await Like.find({ fromUserId: userId });
    const likedUserIds = likedUsers.map(like => like.toUserId);
    
    // Build query to exclude current user and already liked users
    const query: any = {
      _id: { $nin: [...likedUserIds, userId] }
    };

    // Filter by tech stack if provided
    if (techStack) {
      const techArray = Array.isArray(techStack) ? techStack : [techStack];
      query.techStack = { $in: techArray };
    }

    const users = await User.find(query).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create user profile
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

export default router;