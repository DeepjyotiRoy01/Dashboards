const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// Helper function to create JWT token
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME || '1d' }
  );
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user);
    
    // Increment login count and update last login
    user.stats.loginCount += 1;
    user.stats.lastLogin = new Date();
    await user.save();
    
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        stats: user.stats
      },
      token
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      msg: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Please provide email and password'
      });
    }
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Invalid credentials'
      });
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Invalid credentials'
      });
    }
    
    const token = createToken(user);
    
    // Increment login count and update last login
    user.stats.loginCount += 1;
    user.stats.lastLogin = new Date();
    await user.save();
    
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        stats: user.stats
      },
      token
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: 'User not found'
      });
    }
    
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        stats: user.stats
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { name, email, preferences } = req.body;
    
    if (!name || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Please provide name and email'
      });
    }
    
    const user = await User.findById(req.user.userId);
    
    user.name = name;
    user.email = email;
    
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }
    
    await user.save();
    
    const token = createToken(user);
    
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        stats: user.stats
      },
      token
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Please provide old and new password'
      });
    }
    
    const user = await User.findById(req.user.userId).select('+password');
    
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'Invalid old password'
      });
    }
    
    user.password = newPassword;
    await user.save();
    
    res.status(StatusCodes.OK).json({
      msg: 'Password updated successfully'
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};

// Award achievement and points to user
exports.awardAchievement = async (req, res) => {
  try {
    const { achievementName, points } = req.body;
    
    if (!achievementName) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Please provide achievement name'
      });
    }
    
    const user = await User.findById(req.user.userId);
    
    // Check if achievement already exists
    const achievementExists = user.stats.achievements.find(
      achievement => achievement.name === achievementName
    );
    
    if (!achievementExists) {
      user.stats.achievements.push({
        name: achievementName,
        unlockedAt: new Date()
      });
      
      if (points) {
        user.stats.points += points;
      }
      
      await user.save();
    }
    
    res.status(StatusCodes.OK).json({
      msg: 'Achievement awarded successfully',
      stats: user.stats
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message
    });
  }
};